import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, PatternValidator } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ClientService } from '../../../service/client.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormCanDeactivate } from '../../../service/form-can-deactive';

@Component({
  selector: 'app-pre-register',
  templateUrl: './pre-register.component.html',
  styleUrls: ['./pre-register.component.scss']
})
export class PreRegisterComponent extends FormCanDeactivate {


  public form: FormGroup;

  public name: AbstractControl;
  public last_name: AbstractControl;
  public name_two: AbstractControl;
  public last_name_two: AbstractControl;
  public phone: AbstractControl;
  public email: AbstractControl;
  public motive: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public monto: AbstractControl;
  public monto_salario: AbstractControl;
  public plazo: AbstractControl;
  public fecha_solicitud: AbstractControl;

  public telfijo: AbstractControl;
  public passwords: FormGroup;
  public successForm = false;
  public emailError = false;
  public maxPrestamo = 0;
  public interesRate = .1;
  public dateGeneral: Date;
  myDatePickerOptions: IMyDpOptions;
  @Input() dataPrestamo;

  public submitted = true;
  public isCorrectPrestamo = true;
  constructor(fb: FormBuilder, private clientService: ClientService) {
    super();
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'name_two': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'last_name_two': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'phone': '000000',
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'motive': 'default',
      'monto': ['""', Validators.required],
      'monto_salario': ['""', Validators.required],
      'plazo': [30, Validators.required],
      'telfijo': '',
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.last_name = this.form.controls['last_name'];
    this.name_two = this.form.controls['name_two'];
    this.last_name_two = this.form.controls['last_name_two'];
    this.phone = this.form.controls['phone'];
    this.email = this.form.controls['email'];
    this.monto = this.form.controls['monto'];
    this.monto_salario = this.form.controls['monto_salario'];
    this.plazo = this.form.controls['plazo'];
    this.telfijo = this.form.controls['telfijo'];
    this.motive = this.form.controls['motive'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    console.log(this.dataPrestamo);

    const date = new Date();
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      showTodayBtn: true,
      disableUntil: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate() - 1
      },
    };

  }

  public onSubmit(): void {
    console.log(this.form.value);
    console.log(this.dataPrestamo);
    // calculate fecha de pago y los interes y eso mandarlo al service.


    if (this.form.valid) {
      const val = this.form.value;
      const plazo = val.plazo;
      if (plazo === 30) {
        this.interesRate = .1;
      } else {
        this.interesRate = .15;
      }

      /*this.dateGeneral.setDate(this.dateGeneral.getDate() + plazo + 1);
      console.log(this.dateGeneral);
      const payment_date = this.dateGeneral.getFullYear() + '-' + this.dateGeneral.getMonth() + '-' + this.dateGeneral.getDate();*/
      const comision = val.monto * .1;
      const interes = val.monto * this.interesRate;
      const iva = (comision * .16) + (interes * .16);
      const total = val.monto + comision + interes + iva;
      this.dataPrestamo = {
        before_nomina: val.monto_salario,
        comision: val.monto * .1,
        interes: val.monto * this.interesRate,
        iva: iva,
        payment_total: total,
        request_date: val.fecha_solicitud
      }

      console.log(this.dataPrestamo);


      const data = {
        dataPrestamo: this.dataPrestamo,
        dataClient: this.form.value
      }
      console.log(data);
      this.clientService.preregister(data).subscribe((response) => {
        console.log(response);
        if (response.status === 'success') {
          this.successForm = true;
          this.submitted = true;
          this.emailError = false;
          this.form.reset();
          //window.localStorage.setItem('client_key', response.client_key);
        } else {
          this.successForm = false;
          if (response.errors.email[0] === 'has already been taken') {
            this.emailError = true;
          }
        }
      });
      // your code goes here
      // console.log(values);
    } else {
      this.submitted = false;
      this.validateAllFields(this.form);
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

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc

    const date = new Date();
    date.setFullYear(event.date.year, event.date.month, event.date.day);
    //date.setDate(date.getMonth() - 1);
    this.dateGeneral = date;
    console.log(this.dateGeneral.getFullYear());
    console.log(date.getFullYear().toString() + '-' + date.getMonth() + '-' + date.getDate());

    //date.setDate(date.getDate() + this.form.get('plazo').value);    
    this.form.controls['fecha_solicitud'].setValue(event.formatted);
    console.log(event.formatted);
  }

  onChange(e: any): void {
    console.log(e.target.value);
    if (+e.target.value === 2) {
      this.form.controls['plazo'].setValue(45);
    } else {
      this.form.controls['plazo'].setValue(31);
    }

  }

  onChangeMonto(e): void {
    console.log(this.form.get('monto_salario').value);

    const monto_salario = this.form.get('monto_salario').value
    this.dataPrestamo = monto_salario * .25;
    this.form.controls['monto'].setValidators(Validators.max(this.dataPrestamo));
    this.form.controls['monto'].updateValueAndValidity();
    console.log(this.dataPrestamo);
  }


}

