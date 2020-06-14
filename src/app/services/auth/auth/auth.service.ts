import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userData){
    return this.http.post<any>(`${this.baseUrl}/user/login`,userData);
  }

  register(userData){
    return this.http.post<any>(`${this.baseUrl}/user/register`,userData);
  }

  update(userData){
    return this.http.put<any>(`${this.baseUrl}/user/update`,userData);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }

  getName(){
    return localStorage.getItem('name');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    this.router.navigate(['/auth']);
  }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/user/getAll`);
  }

  getMe(){
    return this.http.get<any>(`${this.baseUrl}/user/user`);
  }

}
