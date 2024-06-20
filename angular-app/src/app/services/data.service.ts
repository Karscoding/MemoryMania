import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAggregateData() {
    return this.http.get<any>(`${this.apiUrl}/api/admin/aggregate`, {headers: this.getHeaders()});
  }

  getPlayers() {
    return this.http.get<any>(`${this.apiUrl}/api/admin/players`, {headers: this.getHeaders()});
  }

  getDates() {
    return this.http.get<any>(`${this.apiUrl}/api/admin/dates`, {headers: this.getHeaders()});
  }
}
