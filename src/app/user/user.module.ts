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


@NgModule({
  declarations: [
    LoginComponent,
    AddeventsComponent,
    StudentregisterComponent,
    AddadminComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,ReactiveFormsModule,MatToolbarModule, MatTableModule,MatIconModule,UserRoutingModule,HttpClientModule,MatInputModule,MatButtonModule,MatFormFieldModule,MatCardModule,FormsModule
  ]
})
export class UserModule { }
