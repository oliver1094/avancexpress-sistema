import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../ui/components/modals/default-modal/default-modal.component';
import { ClientService } from '../../service/client.service';
import { IMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'mydatepicker';
import { Router } from '@angular/router';



@Component({
  selector: 'register-complete',
  templateUrl: './register-complete.html',
  styleUrls: ['./register-complete.scss']
})
export class RegisterCompleteComponent {

  public form: FormGroup;
  public submitted = false;
  private isValidRegister = false;
  public myDatePickerOptions: IMyDpOptions;
  public defaultMonth: IMyDefaultMonth;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService,
  private router: Router) {
    this.form = this.fb.group({
      'last_name': ['', Validators.required],
      'last_name_two': '',
      'name': ['', Validators.required],
      'name_two': '',
      'birth_date': ['', Validators.required],
      'email': ['', Validators.required],
      'rfc': ['', Validators.required],
      'curp': ['', Validators.required],
      'phone': ['', Validators.required],
      'street_number': ['', Validators.required],
      'cp': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'municipio': ['', Validators.required],
      'colonia': ['', Validators.required],
    });
    const date = new Date();
    this.myDatePickerOptions = {      
      dateFormat: 'yyyy-mm-dd',      
      disableSince: {
        year: date.getFullYear() - 18,
        month: date.getMonth(),
        day: date.getDate()
      }
    };
    this.defaultMonth = {
      defMonth: '01/' +  String(date.getFullYear() - 18)
  }    
    this.clientService.getClientByKey().subscribe((res) => {
      console.log(res);
      if (res.client && !res.message) {
        const client = res.client;
        this.form.controls['last_name'].setValue(client.last_name);
        this.form.controls['name'].setValue(client.name);
        this.form.controls['phone'].setValue(client.phone);
        this.form.controls['email'].setValue(res.email);
        this.isValidRegister = true;
      }
    });
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.form.controls['birth_date'].setValue(event.formatted);
  }

  public onSubmit(): void {
    console.log(this.form.value);
    /*const activeModal = this.modalService.open(DefaultModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Large Modal';
    this.submitted = true;*/
    const data = {
      client_key: window.localStorage.getItem('client_key'),
      data: this.form.value
    }
    if (this.form.valid && this.isValidRegister) {
      this.clientService.register(data).subscribe((res) => {
        if (res && res.message === 'success') {
          this.submitted = true;
          this.router.navigate(['login']);
        }
      });
      // your code goes here
      // console.log(values);
    }
  }
}
