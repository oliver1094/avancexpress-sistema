import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../service/client.service';
import { IMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'mydatepicker';
import { Router } from '@angular/router';
import {FormCanDeactivate} from '../../../service/form-can-deactive';


@Component({
  selector: 'app-register-second',
  templateUrl: './register-second.component.html',
  styleUrls: ['./register-second.component.scss']
})
export class RegisterSecondComponent extends FormCanDeactivate{

  public form: FormGroup;
  public submitted = false;
  private isValidRegister = false;
  public myDatePickerOptions: IMyDpOptions;
  public defaultMonth: IMyDefaultMonth;
  public isFemale = false;
  public isc = false;
  public isch = false;
  public isca = false;
  public isb = false;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private clientService: ClientService,
    private router: Router) {
      super();
    this.form = this.fb.group({
      'sex': ['', Validators.required],
      'curp': ['', Validators.required],
      'phone': ['', Validators.required],
      'cp': ['', Validators.required],
      'city': ['', Validators.required],
      'civil_state': ['', Validators.required],
      'home_type': ['', Validators.required],
      'plan_type': ['', Validators.required],
      'birth_date': ['', Validators.required],
      'rfc': ['', Validators.required],
      'home_num': ['', Validators.required],
      'state': ['', Validators.required],
      'colonia': ['', Validators.required],
      'dependent': ['', Validators.required],
      'company_phone': ['', Validators.required],
      'is_credit_card': ['', Validators.required],
      'is_credit_hip': ['', Validators.required],
      'is_credit_auto': ['', Validators.required],
      'is_buro': ['', Validators.required]
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
      defMonth: '01/' + String(date.getFullYear() - 18)
    }
    this.clientService.getClientByKey().subscribe((res) => {
      console.log(res);
      if (res.client_laboral) {
        window.localStorage.setItem('client_id', res.client.id);
        this.router.navigate(['home/subir-archivos']);
      } else if (res.client_personal) {
        window.localStorage.setItem('client_id', res.client.id);
        this.router.navigate(['home/register-third']);
      } else if (res.client && !res.message) {
        window.localStorage.setItem('client_id', res.client.id);
        const client = res.client;
        this.isValidRegister = true;
      }

    });
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc    
    this.form.controls['birth_date'].setValue(event.formatted);
    console.log(event);
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
      this.clientService.registerPersonal(data).subscribe((res) => {
        console.log(res);
        if (res.status) {
          this.submitted = true;
          this.router.navigate(['home/register-third']);
        } else {
          alert(res.errors);
        }
      });
    } else {
      this.validateAllFields(this.form);
    }
  }

  isCreditCard(isCreditCard: boolean) {
    console.log(isCreditCard);
    this.form.controls['is_credit_card'].setValue(isCreditCard);
    if (!isCreditCard) {
      this.isc = true;
    } else {
      this.isc = false;
    }
  }

  isCreditHip(isCreditCard: boolean) {
    console.log(isCreditCard);
    this.form.controls['is_credit_hip'].setValue(isCreditCard);
    if (!isCreditCard) {
      this.isch = true;
    } else {
      this.isch = false;
    }
  }

  isCreditAuto(isCreditCard: boolean) {
    console.log(isCreditCard);
    this.form.controls['is_credit_auto'].setValue(isCreditCard);
    if (!isCreditCard) {
      this.isca = true;
    } else {
      this.isca = false;
    }
  }

  isCreditBuro(isCreditCard: boolean) {
    console.log(isCreditCard);
    this.form.controls['is_buro'].setValue(isCreditCard);
    if (!isCreditCard) {
      this.isb = true;
    } else {
      this.isb = false;
    }
  }

  isMale(isMale: boolean) {
    console.log(isMale);
    this.form.controls['sex'].setValue(isMale);
    if (!isMale) {
      this.isFemale = true;
    } else {
      this.isFemale = false;
    }

  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  public setCity(event: any) {
    console.log(event.target.value);
    const zipCode = parseInt(event.target.value);
    this.clientService.getDataByZipCode(zipCode).subscribe((res) => {
      console.log(res);
      this.form.get('city').setValue(res.municipio);
      this.form.get('state').setValue(res.estado);
    });
  }

 
}

