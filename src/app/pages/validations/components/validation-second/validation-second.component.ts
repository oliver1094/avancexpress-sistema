import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../service/client.service';
import { IMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'mydatepicker';
import { FileItem } from '../../../../models/file-item';


@Component({
  selector: 'validation-second',
  templateUrl: './validation-second.html',
  styleUrls: ['./validation-second.scss']
})
export class ValidationSecondComponent {
  public archivosAlreadyUpdated: FileItem[] = [];
  public pdfSrc: string;
  public pdfSrc_1: string;
  public pdfSrc_2: string;
  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public array = [];
  public clientsArray = [];
  public isDisabled = true;
  public submitted: boolean = false;
  selectedIndex: number;
  public myDatePickerOptions: IMyDpOptions;
  public myDatePickerOptionsDefault: IMyDpOptions;

  public defaultMonth: IMyDefaultMonth;
  //private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://avancexpress-api.herokuapp.com';

  constructor(fb: FormBuilder, private modalService: NgbModal,
    private clientService: ClientService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'phone': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'motive': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'monto': '',
      'company_phone': '',
      'last_name_two': '',
      'name_two': '',
      'birth_date': ['', Validators.required],
      'rfc': ['', Validators.required],
      'curp': ['', Validators.required],
      'cp': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'colonia': ['', Validators.required],
      'payment_date': ['', Validators.required],
      'request_date': ['', Validators.required],
      'before_nomina': ['', Validators.required],
      'comision': ['', Validators.required],
      'interes': ['', Validators.required],
      'iva': ['', Validators.required],
      'payment_total': ['', Validators.required],
      'company_name': ['', Validators.required],
      'puesto': ['', Validators.required],
      'salario_r': ['', Validators.required],
      'gasto_mensual': ['', Validators.required],
      'contract_type': ['', Validators.required],
      'salario_mensual': ['', Validators.required],

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
    this.myDatePickerOptionsDefault = {
      dateFormat: 'yyyy-mm-dd'
    };
    this.defaultMonth = {
      defMonth: '01/' + String(date.getFullYear() - 18)
    };
    console.log(this.isDisabled);
    this.isDisabled = true;
    this.clientService.getClients().subscribe((res) => {
      console.log(res.clients);
      this.clientsArray = res.clients;

    });
    this.form.disable();
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    console.log(this.clientsArray);
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  public onAccepted(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.validateSecond(clientId, { status: true }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;
        this.form.reset();
        this.pdfSrc = '';
        this.pdfSrc_1 = '';
        this.pdfSrc_2 = '';
        this.archivosAlreadyUpdated = [];
      }
    });
  }

  public onRejected(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.validateSecond(clientId, { status: false }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;
        this.form.reset();
        this.pdfSrc = '';
        this.pdfSrc_1 = '';
        this.pdfSrc_2 = '';
        this.archivosAlreadyUpdated = [];
      }
    });
  }

  public onSelectClient(index: number, client): void {

    this.form.reset();
    this.archivosAlreadyUpdated = [];
    console.log(client);
    this.selectedIndex = index;
    this.form.get('name').setValue(client.name);
    this.form.get('last_name').setValue(client.last_name);
    this.form.get('last_name_two').setValue(client.last_name_two);
    this.form.get('name_two').setValue(client.name_two);
    let date = new Date(client.personal.birth_date);
    this.form.patchValue({
      birth_date: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
    this.form.get('rfc').setValue(client.personal.rfc);
    this.form.get('curp').setValue(client.personal.curp);
    this.form.get('phone').setValue(client.personal.phone);
    this.form.get('motive').setValue(client.motive);
    this.form.get('company_phone').setValue(client.personal.company_phone);
    this.form.get('email').setValue(client.user.email);
    //this.form.get('street_number').setValue(client.address.street_number);
    this.form.get('cp').setValue(client.personal.cp);
    this.form.get('state').setValue(client.personal.state);
    this.form.get('city').setValue(client.personal.city);
    //this.form.get('municipio').setValue(client.address.municipio);
    this.form.get('colonia').setValue(client.personal.colonia);
    //******** DETALLES LABORALES ***********
    this.form.get('company_name').setValue(client.laboral.company_name);
    this.form.get('puesto').setValue(client.laboral.puesto);
    this.form.get('salario_r').setValue(client.laboral.salario_r);
    this.form.get('contract_type').setValue(client.laboral.contract_type);
    this.form.get('salario_mensual').setValue(client.laboral.salario_mensual);
    this.form.get('gasto_mensual').setValue(client.laboral.gasto_mensual);
    //***** DETALLES PRESTAMO *******
    let payment_date = new Date(client.loan_detail.payment_date);
    let request_date = new Date(client.loan_detail.request_date);
    this.form.patchValue({
      payment_date: {
        date: {
          year: payment_date.getFullYear(),
          month: payment_date.getMonth() + 1,
          day: payment_date.getDate() + 1
        }
      }
    });
    this.form.patchValue({
      request_date: {
        date: {
          year: request_date.getFullYear(),
          month: request_date.getMonth() + 1,
          day: request_date.getDate() + 1
        }
      }
    });
    this.form.get('interes').setValue(client.loan_detail.interes);
    this.form.get('iva').setValue(client.loan_detail.iva);
    this.form.get('monto').setValue(client.monto);
    this.form.get('payment_total').setValue(client.loan_detail.payment_total);
    this.form.get('comision').setValue(client.loan_detail.comision);
    this.form.get('before_nomina').setValue(client.loan_detail.before_nomina);

    const fileItemCaratula = new FileItem(null);
    fileItemCaratula.nombreArchivo = client.id + '_Caratula_' +
      client.name + client.last_name + '.pdf';
    fileItemCaratula.url = this.baseUrl + '/files_clients/' + client.id + '_caratula_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdated.push(fileItemCaratula);
    const fileItemContrato = new FileItem(null);
    fileItemContrato.nombreArchivo = client.id + '_Contrato_' +
      client.name + client.last_name + '.pdf';
    fileItemContrato.url = this.baseUrl + '/files_clients/' + client.id + '_contrato_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdated.push(fileItemContrato);
    const fileItemCarta = new FileItem(null);
    fileItemCarta.nombreArchivo = client.id + '_Carta_' +
      client.name + client.last_name + '.pdf';;
    fileItemCarta.url = this.baseUrl + '/files_clients/' + client.id + '_carta_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdated.push(fileItemCarta);

    this.pdfSrc = this.archivosAlreadyUpdated[0].url;
    this.pdfSrc_1 = this.archivosAlreadyUpdated[1].url;
    this.pdfSrc_2 = this.archivosAlreadyUpdated[2].url;


    console.log(this.form.value);
  }
}
