import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Response, URLSearchParams } from '@angular/http';


@Injectable()
export class AuthorizationService {

  private user: any;
  //private urlBase = 'http://localhost:3000/v1/';
  private urlBase = 'https://avancexpress-api.herokuapp.com/v1/';
  constructor(private apiService: ApiService) { }

  login(credentials): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'authorization/login', credentials).subscribe(user => {
      //this.user = this.toArray(user);
      response.next(user);
    });

    return response;
  }

  logout(access_token): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'authorization/logout', access_token).subscribe(res => {      
      response.next(res);
    });

    return response;
  }

  toArray(value: any, args?: any): any[] {
    const arr = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        arr.push(value[key]);
      }
    }
    return arr;
  }

}
