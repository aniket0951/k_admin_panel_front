
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ActivatedRoute } from '@angular/router';
import { GET_STUDENT, GET_BRANCHES, UPLOAD_PROFILE, APP_PARENT, UPDATE_STUDENT } from 'src/app/utils/endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


interface Student {
  name: string;
  age: number;
  dob: string;
  address: string;
  class_branch: string;
  profile_pic: string;
  parent: Parent
}

interface Parent {
  student_id: string,
  name: string;
  mobile_number: number;
  email: string;
  address: string;
}

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  form: FormGroup;
  studnentId: any;
  studentObj: any;
  branches: any = [];

  parentInfo: Parent = {
    student_id: '',
    name: '',
    mobile_number: 0,
    email: '',
    address: ''
  };

  newStudent: Student = {
    name: '',
    age: 0,
    dob: new Date().toISOString().split('T')[0],
    address: '',
    class_branch: '',
    parent: this.parentInfo,
    profile_pic: ''
  };

  isParentInfoFind: boolean = true;
  imageUrl: any = "";
  selectedFile: File | null = null;

  constructor(public fb: FormBuilder, private http: HttpClient, private appService: AppService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: [''],
      avatar: [null],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studnentId = params['student'];
    });
    this.getStudent()
    this.getBranchs()
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    const token = this.appService.getToken();

    var formData: any = new FormData();
    formData.append("file", file);


    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', token);

    this.http.post<any>(UPLOAD_PROFILE + "/" + this.studnentId, formData, { headers }).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Student profile pic upload successfully !",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );

  }

  addOrUpdateParent(): void {
    this.parentInfo = this.newStudent.parent
    this.parentInfo.student_id = this.studnentId
    this.appService.postRequest(APP_PARENT, this.parentInfo).subscribe((response: any) => {
      if (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parent Updated successfully !",
          showConfirmButton: false,
          timer: 1500
        });
        this.getStudent()
      }
    })

  }

  updateStudent(): void {
    console.log("Update Student : ", this.newStudent);
    let obj = {
      name: this.newStudent.name,
      age: this.newStudent.age,
      dob: this.newStudent.dob,
      address: this.newStudent.address,
      class_branch: this.newStudent.class_branch,
    }

    this.appService.putRequest(UPDATE_STUDENT + this.studnentId, obj).subscribe((response: any) => {
      if (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student has been Updated successfully !",
          showConfirmButton: false,
          timer: 1500
        });
        this.getStudent()
      } else {
        console.log("Error student update");
      }
    })

  }

  getStudent(): void {
    this.appService.getRequest(GET_STUDENT + this.studnentId).subscribe((response: any) => {
      if (response) {
        this.newStudent = response?.data
        if (this.newStudent?.parent) {
          this.isParentInfoFind = false
        } else {
          this.newStudent.parent = this.parentInfo
        }
        this.imageUrl = this.newStudent.profile_pic
      }
    })
  }

  getBranchs(): void {
    this.appService.getRequest(GET_BRANCHES).subscribe((response: any) => {
      if (response) {
        this.branches = response?.data
      }
    })
  }
}
