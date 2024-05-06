import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { GET_STUDENTS, GET_BRANCHES, ADD_STUDENT, TOTAL_COUNT } from 'src/app/utils/endpoints';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

export interface UserData {
  name: string;
  // Define more properties as needed
}

AppService

interface Student {
  name: string;
  age: number;
  dob: string;
  address: string;
  class_branch: string;
}

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ]
})

export class StudentregisterComponent implements OnInit {
  newStudent: Student = {
    name: '',
    age: 0,
    dob: new Date().toISOString().split('T')[0],
    address: '',
    class_branch: ''
  };
  students: Student[] = [];
  branches: any = [];
  addStudentVisible: string = 'out';
  displayedColumns: string[] = ['Name', 'Age', 'DOB', 'Address', 'Branch', 'Action'];
  dataSource!: MatTableDataSource<Student>;
  totalRecords:number = 0;
  defaultPageSize = 10; 
  customPageSizeOptions: number[] = [5, 10, 25, 50, 100];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;



  toggleAddStudent(isFetch: boolean) {
    // fetch the branch names
    if (isFetch) {
      this.getBranchs()
    } else {
      this.totalStudentCount()
      this.getStudents(0,this.defaultPageSize)
    }
    
    this.addStudentVisible = this.addStudentVisible === 'out' ? 'in' : 'out';
  }

  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router:Router) {
    this.studentForm = this.formBuilder.group({
      name: [''],
      age: [''],
      dob: [''],
      address: [''],
      class_branch: [''],
    });
    this.totalStudentCount()
    this.getStudents(0,this.defaultPageSize)
  }

  
  onPageChange(event: PageEvent) {

    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.getStudents(skip, limit);

  }

  ngOnInit(): void { }



  getBranchs(): void {
    this.appService.getRequest(GET_BRANCHES).subscribe((response: any) => {
      if (response) {
        this.branches = response?.data
      }
    })
  }
  getStudents(skip:number, limit:number): void {
    this.appService.getRequest(GET_STUDENTS + skip + "/" + limit).subscribe((result: any) => {
      if (result) {
        this.students = result?.data;
        this.dataSource = new MatTableDataSource(this.students);
      }
    })
  }

  // fetch total student count
  totalStudentCount():void{
    this.appService.getRequest(TOTAL_COUNT).subscribe((response:any) =>{
      if (response) {
        this.totalRecords = response?.data
      }
    })
  }

  validateStudent(student: Student): boolean {
    // Check if all fields are present and not empty
    if (!student.name || !student.age || !student.dob || !student.address || !student.class_branch) {
      console.log("All fields are required.");
      return false;
    }
    // Check if age is not negative
    if (student.age < 0) {
      console.log("Age cannot be negative.");
      return false;
    }
    // Convert dob to date object
    const today = new Date();
    const selectedDate = new Date(student.dob);
    // Check if date of birth is in the past
    if (selectedDate >= today) {
      console.log("Date of birth should be in the past.");
      return false;
    }
    // All validations passed
    return true;
  }


  addStudent(): void {
    // Mark all fields as touched to trigger validation
    this.studentForm.markAllAsTouched();
    // Check if the form is valid
    if (this.studentForm.valid) {
      if (this.validateStudent(this.newStudent)) {

        this.appService.postRequest(ADD_STUDENT, this.newStudent).subscribe((result: any) => {
          console.log(result);
          if (result) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Student has been registered successfull !",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
        this.studentForm.reset();
        this.newStudent = {
          name: '',
          age: 0,
          dob: new Date().toISOString().split('T')[0],
          address: ' ',
          class_branch: ' '
        };

        this.toggleAddStudent(false)



      } 
    }

  }


  checkFieldValidity(): void {
    Object.keys(this.studentForm.controls).forEach(field => {
      const control = this.studentForm.get(field);
      if (control && control.invalid) {
        console.log(`${field} field is invalid.`);
      }
    });
  }

  editStudent(student:any) {
    this.router.navigate(['editstudent'], {queryParams:{student:student?.id}})
    
  }
  deleteStudent(id: any) {

  }
}
function addStudent() {
  throw new Error('Function not implemented.');
}

