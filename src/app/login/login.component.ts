import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { LOGIN } from '../utils/endpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitLoginForm(): void {
  
    if (this.loginForm.valid) {
      const email = this.loginForm?.get('email')?.value;
      const password = this.loginForm?.get('password')?.value;
      
      // Log the username and password to the console
      console.log('email:', email);
      console.log('Password:', password);
      
      const obj = { email, password }; // Assuming obj is defined

      console.log("Submitting form");
      
      this.appService.postRequest(LOGIN, obj).subscribe((result: any) => {
        console.log(result);
        if (result.status) {
          console.log("Success");
          console.log("RESULT--->",result.message);
          console.log("RESULT data token --->",result.data.access_token);

          const token = result.data.access_token; // Adjust this line based on the actual structure of your result object
          localStorage.setItem('authToken', token);
          const storedToken = localStorage.getItem('authToken');
         console.log('Stored Token:', storedToken);
          this.router.navigate(['/viewevents']);
        }else{
          alert(result.message)
        }
      });
    } else {
     alert(" invalid email"); 
    }
  }
}
