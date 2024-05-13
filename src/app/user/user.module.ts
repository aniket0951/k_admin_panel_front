import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { LoginComponent } from '../login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddeventsComponent } from './addevents/addevents.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewEventsComponent } from './event/view-events/view-events.component';
import { ViewbranchComponent } from '../branch/viewbranch/viewbranch.component';
import { EidtbranchComponent } from '../branch/eidtbranch/eidtbranch.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { EditeventComponent } from './event/editevent/editevent.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    LoginComponent,
    AddeventsComponent,
    StudentregisterComponent,
    AddadminComponent,
    UserComponent,
    EditstudentComponent,
    ViewEventsComponent,
    ViewbranchComponent,
    EidtbranchComponent,
    EditeventComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,MatToolbarModule, MatTableModule,MatIconModule,UserRoutingModule,HttpClientModule,MatInputModule,MatButtonModule,MatFormFieldModule,MatCardModule,FormsModule,
    MatSelectModule, MatOptionModule, MatPaginatorModule, MatSnackBarModule, MatCheckboxModule, MatDatepickerModule,MatNativeDateModule,MatRadioModule,

  ],
  providers: [
    DatePipe 
  ]
})
export class UserModule { }
