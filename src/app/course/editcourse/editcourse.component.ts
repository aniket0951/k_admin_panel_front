import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GET_COURSE, UPDATE_COURSE } from 'src/app/utils/endpoints';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

AppService

interface Course {
  id:string,
  name:string,
  description:string,
  is_active:boolean,
  course_duration:string
}
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {
  course:Course={
    id: '',
    name: '',
    description: '',
    is_active: false,
    course_duration: ''
  }

  courseId:any;


  constructor(private appService: AppService, private route: ActivatedRoute, private navigateRouter:Router) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['course'];
    });
    this.getCourse()
  }

  getCourse():void{
    this.appService.getRequest(GET_COURSE + this.courseId).subscribe((response:any)=>{
      if(response) {
        this.course = response.data
      }
    }, (error) =>{
      let msg = error?.error?.error
      if (msg == '') {
        msg = "failed to fetched"
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

  updateCourse():void{
    let obj = {
      id: this.courseId,
      name:this.course.name,
      description:this.course.description,
      course_duration:this.course.course_duration
    }

    this.appService.putRequest(UPDATE_COURSE, obj).subscribe((response:any)=>{
      if(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.navigateRouter.navigate(['course'])
      }
    }, (error)=>{
      let msg = error?.error?.error
      if (msg == '') {
        msg = "failed to update course"
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
