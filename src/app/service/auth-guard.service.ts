import { Injectable } from '@angular/core';
import {
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { FileItem } from '../models/file-item';
import { TypeUser } from 'app/models/type-user';
import { CanActivateChild } from '@angular/router/src/interfaces';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = next.url[0]['path']
    console.log(next);
    console.log(state.url);
    console.log(window.localStorage.getItem('access_token'));
    switch (url) {
      case 'login':
        if (!window.localStorage.getItem('access_token')) {
          return true;
        } else {
          this.router.navigate(['pages', 'dash-client', window.localStorage.getItem('client_id')]);
        }
        break;
      case 'register-complete':
        if (state.root.queryParams.client_key) {
          console.log(state.root.queryParams.client_key);
          window.localStorage.setItem('client_key', state.root.queryParams.client_key);
          return true;
        } else {
          return false;
        }
      case 'dash-client':
        this.router.navigate(['pages', 'dash-client', window.localStorage.getItem('client_id')]);
        break;
      case 'register-second':
        console.log('registersecond');
        if (state.root.queryParams.client_key) {
          console.log(state.root.queryParams.client_key);
          window.localStorage.setItem('client_key', state.root.queryParams.client_key);
          return true;
        } else {
          console.log('no exsise klñajda');
          return false;
          //this.router.navigate(['home']);                    
        }
      case 'register-third':
        if (window.localStorage.getItem('client_key') && window.localStorage.getItem('client_key') != null) {
          return true;
        } else {
          return false;
        }
      case 'subir-archivos':
        if (window.localStorage.getItem('client_key') && window.localStorage.getItem('client_key') != null) {
          return true;
        } else {
          return false;
        }
      case 'register-end':
        if (window.localStorage.getItem('client_key') && window.localStorage.getItem('client_key') != null) {
          return true;
        } else {
          return false;
        }
      default:
        console.log('default asldasdasd');
        if (window.localStorage.getItem('access_token')) {
          return true;
        } else {
          return false;
        }
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    console.log(state);
    console.log('checking child route access');
    return true;
  }

}
