import { ClientPersonal } from './../_models/ClientPersonal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../_models/Client';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `${environment.urlAddress}client/`;

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<Client> {
    const params = new HttpParams()
      .set('username', username.toString())
      .set('password', password.toString());


    return this.http.get<Client>(`${this.url}login`, { params: params });
  }

  loginSerialOnly(serial: string): Observable<Client> {
    const params = new HttpParams()
      .set('serial', serial.toString());

    return this.http.get<Client>(`${this.url}loginSerialOnly`, { params: params });
  }

}
