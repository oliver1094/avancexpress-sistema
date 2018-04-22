import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, PatternValidator } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ClientService } from '../../../service/client.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Router } from '@angular/router';
import { FormCanDeactivate } from '../../../service/form-can-deactive';

@Component({
  selector: 'app-register-third',
  templateUrl: './register-third.component.html',
  styleUrls: ['./register-third.component.scss']
})
export class RegisterThirdComponent extends FormCanDeactivate implements OnInit {

  public form: FormGroup;
  myDatePickerOptions: IMyDpOptions;

  constructor(private fb: FormBuilder, private clientService: ClientService,
    private router: Router) {
      super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      'company_name': ['', Validators.required],
      'puesto': ['', Validators.required],
      'salario_r': ['', Validators.required],
      'gasto_mensual': ['""', Validators.required],
      'contract_type': ['', Validators.required],
      'salario_mensual': ['""', Validators.required],
      'fecha_init': ['', Validators.required]
    });

    const date = new Date();
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      showTodayBtn: true      
    };
  }

  onDateChanged(event: IMyDateModel) {
    this.form.controls['fecha_init'].setValue(event.formatted);
  }

  public onSubmit(): void {
    console.log(this.form);
    /*const activeModal = this.modalService.open(DefaultModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Large Modal';
    this.submitted = true;*/
    const data = {
      client_key: window.localStorage.getItem('client_key'),
      data: this.form.value
    }
    if (this.form.valid) {
      this.clientService.registerLaboral(data).subscribe((res) => {
        console.log(res);
        if (res.status) {
          this.router.navigate(['home/subir-archivos']);          
        } else {
          alert(res.errors);
        }        
      });
    } else {
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

}
