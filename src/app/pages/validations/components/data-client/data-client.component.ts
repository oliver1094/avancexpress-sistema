import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../service/client.service';
import { IMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'mydatepicker';
import { FileItem } from '../../../../models/file-item';
import { PDFProgressData } from 'pdfjs-dist';


@Component({
  selector: 'form-data-client',
  templateUrl: './data-client.html',
  styleUrls: ['./data-client.scss']
})
export class DataClientComponent {
  @Input() isDisabled: boolean;
  public form: FormGroup;

  public archivosAlreadyUpdated: FileItem[] = [];

  public clientsArray = [];
  public hourFilters = [
    { name: 'Todos', value: 3 },
    { name: 'Mayor que 48 horas', value: 0 },
    { name: 'Entre 24 y 48 horas', value: 1 },
    { name: 'Menor que 24 horas', value: 2 }
  ];
  public myDatePickerOptions: IMyDpOptions;
  public myDatePickerOptionsDefault: IMyDpOptions;
  public hourFilter = 3;
  public defaultMonth: IMyDefaultMonth;
  //private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://avancexpress-api.herokuapp.com';

  public submitted: boolean = false;
  public startDate: Date;
  public endDate: Date;
  public yellow = false;
  public green = false;
  public red = false;
  selectedIndex: number;

  constructor(fb: FormBuilder, private modalService: NgbModal,
    private clientService: ClientService) {

    this.form = fb.group({
      'ife': '',
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
    this.getClients();
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    console.log(this.clientsArray);
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  onDateChanged(e) {
    console.log(e.formatted);
    this.form.get('birth_date').setValue(e.formatted);
  }

  onDateChangedPago(e) {
    console.log(e.formatted);
    this.form.get('payment_date').setValue(e.formatted);
  }

  onDateChangedRequest(e) {
    console.log(e.formatted);
    this.form.get('request_date').setValue(e.formatted);
  }

  public onAccepted(clientId: number, index: number) {
    console.log(clientId);
    const value = this.form.value;
    console.log(value);
    const fecha_pago = value.payment_date.date.year + '-' + value.payment_date.date.month +
      '-' + value.payment_date.date.day;
    const fecha_solicitud = value.request_date.date.year + '-' + value.request_date.date.month +
      '-' + value.request_date.date.day;
    const fecha_nacimiento = value.birth_date.date.year + '-' + value.birth_date.date.month +
      '-' + value.birth_date.date.day;
    const data = {
      ife: {
        ife: value.ife
      },
      client_general: {
        name: value.name,
        last_name: value.last_name,
        name_two: value.name,
        last_name_two: value.last_name,
        motive: value.motive,                
        monto: value.monto
      },
      client_laboral: {
        company_name: value.company_name,
        puesto: value.puesto,
        salario_r: value.salario_r,
        gasto_mensual: value.gasto_mensual,
        contract_type: value.contract_type,
        salario_mensual: value.salario_mensual
      },
      client_personal: {  
        birth_date: fecha_nacimiento,
        rfc: value.rfc,
        curp: value.curp,        
        phone: value.phone,     
        company_phone: value.company_phone, 
        cp: value.cp,
        state: value.state,
        city: value.city,        
        colonia: value.colonia
      },
      loan_detail: {
        payment_date: fecha_pago,
        before_nomina: value.before_nomina,
        comision: value.comision,
        interes: value.interes,
        iva: value.iva,
        payment_total: value.payment_total,
        request_date: fecha_solicitud
      },
      status: true
    }
    console.log(data);
    this.clientService.changeStatusRequest(clientId, data).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;
        this.form.reset();
        this.archivosAlreadyUpdated = [];
      }
    });
  }

  public onRejected(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.changeStatusRequest(clientId, { status: false }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;
        this.form.reset();
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
    const files = client.files;
    for (const file of files) {
      const fileItem = new FileItem(null);
      fileItem.id = file.id;
      fileItem.nombreArchivo = file.name;
      fileItem.url = this.baseUrl + file.url;
      this.archivosAlreadyUpdated.push(fileItem);
    }

    console.log(this.form.value);
  }

  onChange() {
    this.selectedIndex = -1;
    this.form.reset();
    console.log(this.hourFilter);
    const date = new Date();
    let start_date = '';
    console.log(start_date);
    let end_date = '';
    switch (this.hourFilter) {
      case 0:
        start_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        date.setDate(date.getDate() - 2);
        end_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.red = true;
        this.yellow = false;
        this.green = false;
        break;
      case 1:
        date.setDate(date.getDate() - 1);
        start_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        date.setDate(date.getDate() - 1);
        end_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        console.log(start_date);
        console.log(end_date);
        this.red = false;
        this.yellow = true;
        this.green = false;
        break;
      case 2:
        start_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        date.setDate(date.getDate() - 1);
        end_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.red = false;
        this.yellow = false;
        this.green = true;
        break;
      case 3:
        this.getClients();
        break;
    }
    console.log(start_date);
    if (this.hourFilter != 3) {
      this.clientService.filterClients(this.hourFilter, start_date, end_date).subscribe((res) => {
        if (res) {
          this.clientsArray = res.clients;
          for (const client of this.clientsArray) {
            client['yellow'] = this.yellow;
            client['red'] = this.red;
            client['green'] = this.green;
          }
          console.log(res.clients);
        }
      });
    }

  }
  
  onProgress(progressData: PDFProgressData) {
    // do anything with progress data. For example progress indicator
    console.log(progressData);
  }

  onError(error: any) {
    // do anything
    console.log(error);
  }

  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clientsArray = res.clients;
      const dateNow = Date.now() / 1000;
      const dateBefore = (Date.now() / 1000) - 86400; // - 24
      const dateAfter = (Date.now() / 1000) - 172800; // - 48
      for (const client of this.clientsArray) {
        const newDate = new Date(client.date);
        const dateClient = newDate.getTime() / 1000;
        if (dateClient <= dateAfter) {
          client['yellow'] = false;
          client['red'] = true;
          client['green'] = false;
        } else if ( dateClient > dateAfter && dateClient < dateBefore ) {
          client['yellow'] = true;
          client['red'] = false;
          client['green'] = false;
        } else if (dateClient >= dateBefore) {
          client['yellow'] = false;
          client['red'] = false;
          client['green'] = true;
        }
      }
      console.log(this.clientsArray);
    });
  }

  onChangeRadio(val) {
    console.log(val);
  }
}
