import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { LIST_FACILITIES, ADD_FACILITIES, DELETE_FACILITIES, GET_FACILITIES, UPDATE_FACILITIES } from 'src/app/utils/endpoints';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


AppService

interface Facilities {
  id:string,
  title:string,
  description:string,
  imageURL:string
}

@Component({
  selector: 'app-viewfacilites',
  templateUrl: './viewfacilites.component.html',
  styleUrls: ['./viewfacilites.component.css'],
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
export class ViewfacilitesComponent implements OnInit {
  
  facilities:any = [];
  newFacility:Facilities = {
    id:'',
    title: '',
    description: '',
    imageURL: ''
  };

  editFacilityVisible: boolean = false; 
  addFacilityVisible: string = 'out';
  displayedColumns: string[] = ['Title','Description', 'Action']; // Add more column names as needed
  dataSource!: MatTableDataSource<Facilities>;
  
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router:Router) {
  }


  toggleAddStudent() {
    this.editFacilityVisible = false
    this.addFacilityVisible = this.addFacilityVisible === 'out' ? 'in' : 'out';
  }

  ngOnInit(): void {
    this.listFacilites()
  }

  listFacilites():void {
    this.appService.getRequest(LIST_FACILITIES).subscribe((response:any)=>{
      if(response){
        this.facilities = response.data
        this.dataSource = new MatTableDataSource(response.data);
       
      }
    }, (error) => {

    })
  }

  addFacility():void{
    this.appService.postRequest(ADD_FACILITIES, this.newFacility).subscribe((response:any)=>{
      if(response) {
        

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listFacilites()
        this.toggleAddStudent()
      }
    }, (error) =>{
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
      this.listFacilites()
    this.toggleAddStudent()
    })
  }

  editFacility(data:any):void{
    this.appService.getRequest(GET_FACILITIES + data).subscribe((response:any)=>{
      if(response) {
        console.log("RESPONSE :", response.data);
        
        this.newFacility.title = response.data?.title
        this.newFacility.description = response.data?.description
        this.newFacility.imageURL = response.data?.imageURL
        this.newFacility.id = response.data?.id
      }
    }, (error) => {

    })
    this.editFacilityVisible = !this.editFacilityVisible
  }

  updateFacility():void{
  
    if(this.newFacility.id == '') {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "failed to uddate",
        showConfirmButton: false,
        timer: 1500
      });
    } 

    let obj = {
      title:this.newFacility.title,
      description:this.newFacility.description
    }

    this.appService.putRequest(UPDATE_FACILITIES + this.newFacility.id, obj).subscribe((response:any)=>{
      if(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.listFacilites()
      }
    }, (error) => {
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
      this.listFacilites()
    })
    this.editFacilityVisible = !this.editFacilityVisible

  }

  deleteFacility(id:any):void{
    this.appService.deleteRequest(DELETE_FACILITIES + id).subscribe((response:any)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.listFacilites()
    }, (error) => {
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
      this.listFacilites()
    })
  }
}
