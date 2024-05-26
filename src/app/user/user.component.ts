import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private router: Router){}
  logout(){

    this.router.navigate(['/login']);

  }

  addEvent(): void {
    console.log('addEvent')
    this.router.navigate(['/viewevents']); // Navigate to the "studentregister" route
  }
  addstudent(): void {
    this.router.navigate(['/studentregister']); // Navigate to the "studentregister" route
  }
  addadmin(): void {
    this.router.navigate(['/addadmin']); // Navigate to the "studentregister" route
  }

  viewbranches():void {
    this.router.navigate(['viewbranch'])
  }

  viewcourse(): void{
    this.router.navigate(['course'])
  }

  viewfacilities():void{
    this.router.navigate(['viewfacilities'])
  }

  viewenquiries():void{
    this.router.navigate(['viewenquiries'])
  }

}

