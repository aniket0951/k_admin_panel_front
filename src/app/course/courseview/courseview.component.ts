import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { LIST_COURSES, ADD_COURSE, DELETE_COURSE, ACTIVE_COURSE } from 'src/app/utils/endpoints';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

AppService

interface Course {
  id:string,
  name:string,
  description:string,
  is_active:boolean,
  course_duration:string
}

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css'],
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
export class CourseviewComponent implements OnInit {
  
  courses:any = [];
  newCourse:Course = {
    id: '',
    name: '',
    description: '',
    is_active: false,
    course_duration: ''
  }

  addCourseVisible:string = 'out';
  displayedColumns: string[] = ['Name','Description', 'Course Duration', 'Status', 'Action']; // Add more column names as needed
  dataSource!: MatTableDataSource<Course>;

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router:Router) {

    
  }

  toggleAddStudent() {
    console.log("toggle get called..");
    
    this.addCourseVisible = this.addCourseVisible === 'out' ? 'in' : 'out';
  }


  ngOnInit(): void {
    this.listCourse()
    // throw new Error('Method not implemented.');
  }

  listCourse():void {
    this.appService.getRequest(LIST_COURSES).subscribe((response:any) => {
      if(response) {
        this.courses = response?.data
        this.dataSource = new MatTableDataSource(this.courses);
      }else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to load courses !",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  addCourse():void {
    this.appService.postRequest(ADD_COURSE, this.newCourse).subscribe((response:any) => {
      if(response) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listCourse()
        this.toggleAddStudent()
      }
    }, (error)=>{
      let  msg = error.error?.error;
      if (msg == ''){
        msg = "something went's wrong!"
      }
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
      this.listCourse()
    this.toggleAddStudent()
    })

    this.toggleAddStudent()
  }

  editCourse(param:any):void {
    this.router.navigate(['editcourse'], {queryParams:{course:param?.id}})
  }

  deleteCourse(id:any):void{
    this.appService.deleteRequest(DELETE_COURSE + id).subscribe((response:any)=>{
      if(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listCourse()
      }
    }, (error)=> {
      let msg = error?.error?.error
      if (msg == '') {
        msg = "failed to delete course"
      }
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  changeStatus(tag:boolean, id:any){
    let obj = {
      id:id,
      isActive:tag
    }

    this.appService.postRequest(ACTIVE_COURSE, obj).subscribe((response:any)=>{
      if(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listCourse()
      }
    }, (error)=>{
      let msg = error?.error?.error
      if (msg == '') {
        msg = "course updatation failed"
      }
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
    })
    
  }

}
