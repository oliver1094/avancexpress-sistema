import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  //private headers = new Headers();
  private headers: Object = {
    'Accept': 'application/json'
    //'Content-Type': 'application/json'
};

  constructor(private http: Http) { 
    //this.headers.append('authorization', 'Bearer ' + window.localStorage.getItem('access_token'));
  }

  get(url: string) {
    
    if (window.localStorage.getItem('access_token') && this.headers['Authorization'] === undefined) {
      this.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('access_token');
    }    
    let headers: Headers;
    let options: RequestOptions;
    headers = new Headers(this.headers);
    options = new RequestOptions({headers: headers});
    const response = new ReplaySubject<any>(1);
    this.http.get(url, options) // ...using post request
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    .subscribe((res) => {
        response.next(res);
        console.log(response);
    });

    return response;
  }

  post(url: string, body: Object): ReplaySubject<Object> {
    //const headers1 = this.headers;
    if (window.localStorage.getItem('access_token') && this.headers['Authorization'] === undefined) {
      this.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('access_token');
    }    
    let headers: Headers;
    let options: RequestOptions;
    headers = new Headers(this.headers);
    options = new RequestOptions({headers: headers});
    const response = new ReplaySubject<any>(1);

        this.http.post(url, body, options) // ...using post request
                    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
                    .subscribe((res) => {
                        response.next(res);                        
                    });
    
        /*this.http.post(url, body, {headers})
                    .map(res => {
                      console.log(res.json());
                      response.next(res);
                    });*/
    return response;
}

}
