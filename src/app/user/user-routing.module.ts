import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeventsComponent } from './addevents/addevents.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { UserComponent } from './user.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ViewEventsComponent } from './event/view-events/view-events.component';
import { ViewbranchComponent } from '../branch/viewbranch/viewbranch.component';
import { EidtbranchComponent } from '../branch/eidtbranch/eidtbranch.component';
import { EditeventComponent } from './event/editevent/editevent.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'addevent', component: AddeventsComponent },
      { path: 'studentregister', component: StudentregisterComponent },
      { path: 'addadmin', component: AddadminComponent },
      { path: 'editstudent', component:EditstudentComponent},
      { path: 'viewevents', component:ViewEventsComponent},
      { path: 'viewbranch', component:ViewbranchComponent},
      { path: 'editbranch', component:EidtbranchComponent},
      { path: 'editevents', component:EditeventComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

