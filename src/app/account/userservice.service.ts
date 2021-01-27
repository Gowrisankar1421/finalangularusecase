import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
      
  constructor(private http: HttpClient,private router:Router) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string = "http://localhost:3000/Users";
  getUsers(){
    return this.http.get<User[]>(this.url);
  }
  createUsers(user:User): Observable<any>{
    return this.http.post(this.url,user);
  }
  update(id,user:User): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`,user,this.httpOptions);    
  }
  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getUser(id: number):Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

}
