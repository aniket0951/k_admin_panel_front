import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root' 
})
export class AppService {
 constructor(private http: HttpClient, private router: Router) { }

public getToken():string{
  const token = localStorage.getItem('authToken');
  return token ? token : ""
} 

public getMultiPartOptions() {
  const token = localStorage.getItem('authToken');

    if(!token){
      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data', 
        'Access-Control-Allow-Origin': 'true',
        'Allow-access': 'true'  });
        console.log("not token ",headers);
        return { headers };
    }
      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': 'true',
        'Authorization': token, // Assuming the token is a Bearer token
        'Allow-access': 'true' 
      });
      console.log("token ",headers);
      return { headers };
  
}

 public getHttpOptions() {
  const token = localStorage.getItem('authToken');

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

 putRequest(url:string, data:any) {
  return this.http.put<any>(url, data, this.getHttpOptions())
 }

 deleteRequest(url:string) {
  return this.http.delete<any>(url, this.getHttpOptions())
 }

 postMultipartRequest(url:string, data:any) {
  return this.http.post<any>(url, data,  this.getMultiPartOptions());
 }

 getRequest(url: string) {
    // Use the getHttpOptions function to get the current httpOptions
    return this.http.get<any>(url,this.getHttpOptions());
 }

}


