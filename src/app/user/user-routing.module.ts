import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeventsComponent } from './addevents/addevents.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'addevent', component: AddeventsComponent },
      { path: 'studentregister', component: StudentregisterComponent },
      { path: 'addadmin', component: AddadminComponent },
      // Add more routes if necessary
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

