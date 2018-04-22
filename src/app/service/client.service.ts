import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FileItem } from '../models/file-item';

import { Response, URLSearchParams } from '@angular/http';


@Injectable()
export class ClientService {

  private clients: any;
  private urlBase = 'https://avancexpress-api.herokuapp.com/v1/';
  //private urlBase = 'http://localhost:3000/v1/';
  constructor(private apiService: ApiService) { }
  
  getClients(): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients').subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }

  preregister(data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/preregister', data).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }

  registerPersonal(data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/register_personal', data).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }

  registerLaboral(data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/register_laboral', data).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }
  register(data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/register', data).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }

  getClientByKey(): ReplaySubject<any> { 
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/get_client?client_key='+window.localStorage.getItem('client_key')).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }

  uploadFile(idClient:number, data: File): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/upload_files?client_id=' +idClient, data).subscribe(res => {
      //this.user = this.toArray(user);
      response.next(res);
    });

    return response;
  }

  getClientFiles(client_key:string): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/get_client_files?client_key='+client_key).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }

  getContractClientFiles(client_id:number): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/get_contract_files?client_id=' +client_id).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }

  getAllClientFiles(client_id:number): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/get_all_files?client_id=' +client_id).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }

  changeStatusRequest(client_id: number, data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/change_status_loan?client_id=' + client_id, data).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
  }

  validateSecond(client_id: number, data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/validation_second?client_id=' + client_id, data).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
  }

  validateThird(client_id: number, data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/validation_third?client_id=' + client_id, data).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
  }

  validateFour(client_id: number, data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/validation_four?client_id=' + client_id, data).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
  }

  validateFive(client_id: number, data): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.post(this.urlBase + 'clients/validation_five?client_id=' + client_id, data).subscribe(res => {
      //this.user = this.toArray(user);  
      console.log('validation five');    
      response.next(res);
    });

    return response;
  }

  aplyCupon(nameCupon: string): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/aply_cupon?nameCupon=' + nameCupon).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
  }

  filterClients(value:number, start_date:string, end_date:string): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'clients/get_client_by_hour?hour='+ value +
    '&start_date=' + start_date + '&end_date=' + end_date).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }

  getDataByZipCode(zipCode:number): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get('https://api-codigos-postales.herokuapp.com/v2/codigo_postal/'+zipCode).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;
    
  }

  /*getClients(): ReplaySubject<any> {
    const response = new ReplaySubject<any>(1);
    this.apiService.get(this.urlBase + 'v1/clients/get_client_files?client_id=' +client_id).subscribe(res => {
      //this.user = this.toArray(user);      
      response.next(res);
    });

    return response;

  }*/

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
