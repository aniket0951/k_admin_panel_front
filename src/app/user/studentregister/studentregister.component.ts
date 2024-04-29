import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition,group } from '@angular/animations';
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
    dob:  new Date().toISOString().split('T')[0],
    address: '',
    class_branch: ''
  };
  students: Student[] = [];
  addStudentVisible: string = 'out'; // Initialize the visibility of add student section

  // Function to toggle the visibility of add student section
  toggleAddStudent() {
    this.addStudentVisible = this.addStudentVisible === 'out' ? 'in' : 'out';
  }

  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.studentForm = this.formBuilder.group({
      name: [''],
      age: [''],
      dob: [''],
      address: [''],
      class_branch: [''],
    });
  }


ngOnInit(): void {
    
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
      // Validate the newStudent object
      if (this.validateStudent(this.newStudent)) {
        // Form is valid, proceed with adding the student
        console.log("Form is valid. Proceeding to add student.");
        console.log("New Student:", this.newStudent);
        this.appService.postRequest("http://192.168.0.119:8000/api/student/add-student", this.newStudent).subscribe((result: any) => {
          console.log(result);
          if (result.res) {
            console.log("Success");
          }else{
            console.log("Error",result);
          }
        });
        this.studentForm.reset();
        this.newStudent = {
          name: ' ',
          age: 0,
          dob:  new Date().toISOString().split('T')[0],
          address: ' ',
          class_branch: ' '
        };
       
      } else {
       alert(" invalid username"); 
      }
    }
      
  }
  
  // addStudent():void {
  //   let obj = {
  //     "name": "Student1",
  //     "age": 16, 
  //     "dob": "TestUser Update",
  //     "address": "TestUser@gmail.com",
  //     "class_branch":"BRANCH-1"
  //   };

  //   this.appService.postRequest("http://192.168.0.119:8000/api/student/add-student", obj).subscribe((result: any) => {
  //       console.log(result);
  //       if (result.status) {
  //         console.log("Success");
  //         console.log("RESULT--->",result.message);
          
  //       }else{
  //         alert(result.message)
  //       }
  //     });
  // }

  checkFieldValidity(): void {
    Object.keys(this.studentForm.controls).forEach(field => {
      const control = this.studentForm.get(field);
      if (control && control.invalid) {
        console.log(`${field} field is invalid.`);
      }
    });
  }

  editStudent(id:any){

  }
  deleteStudent(id:any) {

  }
}
function addStudent() {
  throw new Error('Function not implemented.');
}

