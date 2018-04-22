import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, PatternValidator } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ClientService } from '../../../service/client.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private clientService: ClientService) {    
  }

  ngOnInit() {
    
  }

  submit(){
    
  }  

}
