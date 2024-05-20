import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { GET_STUDENTS, GET_BRANCHES, ADD_STUDENT, TOTAL_COUNT, ADD_BRANCH } from 'src/app/utils/endpoints';
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

interface Branch {
  name:string,
  address:string,
  is_active:boolean
}


@Component({
  selector: 'app-viewbranch',
  templateUrl: './viewbranch.component.html',
  styleUrls: ['./viewbranch.component.css'],
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
export class ViewbranchComponent implements OnInit {

  branches: any = [];
  newBranch:Branch = {
    name: '',
    address: '',
    is_active: true
  }
  addStudentVisible: string = 'out';
  displayedColumns: string[] = ['Name','Address', 'Status', 'Action']; // Add more column names as needed
  dataSource!: MatTableDataSource<Branch>;
  
  toggleAddStudent() {

    this.addStudentVisible = this.addStudentVisible === 'out' ? 'in' : 'out';
  }


  constructor(private formBuilder: FormBuilder, private appService: AppService, private router:Router) {

    this.getBranchs()
  }



  ngOnInit(): void { }



  getBranchs(): void {
    this.appService.getRequest(GET_BRANCHES).subscribe((response: any) => {
      if (response) {
        this.branches = response?.data
        this.dataSource = new MatTableDataSource(this.branches);
      }
    })
  }



  addBranch(): void {
    this.appService.postRequest(ADD_BRANCH, this.newBranch).subscribe((result: any) => {
      console.log(result);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Branch has been addedd successfull !",
          showConfirmButton: false,
          timer: 1500
        });
        this.getBranchs()
      }
    });
    this.toggleAddStudent()

  }




  editStudent(branch:any) {
    this.router.navigate(['editbranch'], {queryParams:{branch:branch?.id}})
    
  }
  deleteStudent(id: any) {

  }

}
