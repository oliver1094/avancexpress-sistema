import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { AuthorizationService } from '../../../service/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState, private oauth: AuthorizationService,
    private route: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout() {
    this.oauth.logout({ access_token: window.localStorage.getItem('access_token') })
      .subscribe((response) => {
        console.log(response);
        if (response.response === 'success') {
          window.localStorage.removeItem('access_token');
          window.localStorage.removeItem('user_type');
          window.localStorage.removeItem('client_id');
          this.route.navigate(['home']);
        }

      });

  }
}
