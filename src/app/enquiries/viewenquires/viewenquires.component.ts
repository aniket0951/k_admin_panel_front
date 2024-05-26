import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { LIST_FACILITIES, ADD_FACILITIES, DELETE_FACILITIES, GET_FACILITIES, UPDATE_FACILITIES, UPLOAD_FACILITY_IMAGE, LIST_ENQUIRIES, DELETE_ENQUIRY } from 'src/app/utils/endpoints';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';

AppService

interface Enquires {
  name:string,
  email:string,
  contact:string,
  subject:string,
  message:string
}

@Component({
  selector: 'app-viewenquires',
  templateUrl: './viewenquires.component.html',
  styleUrls: ['./viewenquires.component.css']
})
export class ViewenquiresComponent implements OnInit {
  enquiries:any = [];

  displayedColumns: string[] = ['Name','Email', 'Contact','Subject', 'Message', 'Date', 'Action']; // Add more column names as needed
  dataSource!: MatTableDataSource<Enquires>;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private appService: AppService, private router:Router) {
  }

  ngOnInit(): void {
    this.listEnquiries()
  }

  listEnquiries():void{
    this.appService.getRequest(LIST_ENQUIRIES).subscribe((response:any)=>{
      if(response) {
        this.enquiries = response?.data
        this.dataSource = this.enquiries
      }
    })
  }

  deleteEnquire(id:any):void{
    this.appService.deleteRequest(DELETE_ENQUIRY + id).subscribe((response:any)=>{
      if(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listEnquiries()
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
      this.listEnquiries()
    })
  }
}
