import { ClientSocial } from './../_models/ClientSocial';
import { ClientPersonal } from './../_models/ClientPersonal';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../_models/Client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.urlAddress}client/`;

  constructor(private http: HttpClient) { }


  clientPersonalUpdate(clientPersonal: ClientPersonal): Observable<void> {
    return this.http.post<void>(`${this.url}clientPersonalUpdate`, clientPersonal);
  }


  clientSocialUpdate(clientSocial: ClientSocial): Observable<void> {
    return this.http.post<void>(`${this.url}clientSocialUpdate`, clientSocial);
  }


  clientGet(link: string): Observable<Client> {
    const params = new HttpParams()
      .set('link', link.toString());

    return this.http.get<Client>(`${this.url}clientGet`, { params: params });
  }
}
