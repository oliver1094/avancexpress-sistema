import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../service/client.service';


@Component({
    selector: 'client-summary',
    templateUrl: './client-summary.html',
    styleUrls: ['./client-summary.scss']
  })
export class ClientSummaryComponent {
  
  constructor(fb:FormBuilder,
  private clientService: ClientService) {
    
  }

}
