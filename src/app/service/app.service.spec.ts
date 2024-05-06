import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root' 
})
export class AppService {
 constructor(private http: HttpClient, private router: Router) { }

 // Modify httpOptions to be a function that returns the options object
 private getHttpOptions() {
    const token = localStorage.getItem('authToken');
    if(!token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',  });
        return { headers };
    }else{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token // Assuming the token is a Bearer token
        
      });
      return { headers };
    }
   
 }

 postRequest(url: string, data: any) {
    // Use the getHttpOptions function to get the current httpOptions
    return this.http.post<any>(url, data, this.getHttpOptions());
 }
}
