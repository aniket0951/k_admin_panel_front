
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ActivatedRoute } from '@angular/router';
import { UPDATE_BRANCH, GET_BRANCH } from 'src/app/utils/endpoints';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Branch {
  name:string,
  address:string,
  is_active:boolean
}

@Component({
  selector: 'app-eidtbranch',
  templateUrl: './eidtbranch.component.html',
  styleUrls: ['./eidtbranch.component.css']
})
export class EidtbranchComponent implements OnInit {
  branchId: any;
  branch:Branch = {
    name: '',
    address: '',
    is_active: false
  };

  constructor(private appService: AppService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.branchId = params['branch'];
    });
    this.getBranch() 
  }

  updateBranch():void{
    console.log("Update Branch : ", this.branch);
    this.appService.putRequest(UPDATE_BRANCH + this.branchId, this.branch).subscribe((response:any)=> {
      if(response){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Branch has been updated successfull !",
          showConfirmButton: false,
          timer: 1500
        });
        this.getBranch()
      }else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response?.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  getBranch():void{
    this.appService.getRequest(GET_BRANCH + this.branchId).subscribe((responce:any)=>{
      if(responce){
        this.branch = responce?.data
        console.log("Branch data : ", this.branch);
        
      }
    })
  }

}
