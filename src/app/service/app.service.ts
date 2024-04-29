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
    const storedToken = localStorage.getItem('authToken');
    console.log('Stored Token:', storedToken);
    console.log("token prints --> ",token)
    if(!token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': 'true',
        'Allow-access': 'true'  });
        console.log("not token ",headers);
        return { headers };
    }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
        'Authorization': token, // Assuming the token is a Bearer token
        'Allow-access': 'true' 
      });
      console.log("token ",headers);
      return { headers };
    
   
 }

 postRequest(url: string, data: any) {
    // Use the getHttpOptions function to get the current httpOptions
    return this.http.post<any>(url, data,  this.getHttpOptions());
 }

 getRequest(url: string) {
    // Use the getHttpOptions function to get the current httpOptions
    return this.http.get<any>(url,this.getHttpOptions());
 }

}


