import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login_check';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string , password: string ) {
    return this.http.post<any>(`${this.apiUrl}/api/login_check`, { username, password })
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
