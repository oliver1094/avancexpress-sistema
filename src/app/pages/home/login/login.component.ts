import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../service/authorization.service';
import { ClientService } from '../../../service/client.service';
import { TypeUser } from '../../../models/type-user';



@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted = true;

  constructor(fb: FormBuilder, private router: Router, private oauth: AuthorizationService,
    private clientService: ClientService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(): void {    
    if (this.form.valid) {
      //this.router.navigate(['pages']);            
      // your code goes here
      // console.log(values);      
      this.oauth.login(this.form.value).subscribe((response) => {
        if (!response.error) {
          this.submitted = true;
          window.localStorage.setItem('access_token', response.access_token);
          window.localStorage.setItem('user_type', response.user.type_user.id);
          window.localStorage.setItem('client_id', response.user.client_id);
          console.log(response.user.type_user);          
          switch (+response.user.type_user.id) {
            case TypeUser.ADMIN:
            console.log('admin');
              this.router.navigate(['pages']);
              break;
            case TypeUser.CLIENT:
            console.log('client');            
            this.router.navigate(['pages', 'dash-client', response.user.client_id]);
              break;
            case TypeUser.VALIDATOR:
              this.router.navigate([]);
              break;
          }
        } else {
          this.submitted = false;
        }
      },
        error => {
          console.log('error en login');
        });
    }
  }
}
