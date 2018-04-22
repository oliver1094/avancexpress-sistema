import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../service/client.service';
import { IMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'mydatepicker';


@Component({
  selector: 'validation-first',
  templateUrl: './validation-first.html',
  styleUrls: ['./validation-first.scss']
})
export class ValidationFirstComponent {
  public form: FormGroup;
  public pdfSrc: string = 'assets/files/credito.pdf';
  public pdfSrc_1: string = 'assets/files/carta.pdf';
  public pdfSrc_2: string = 'assets/files/contrato.pdf';

  public clientsArray = [];
  public myDatePickerOptions: IMyDpOptions;

  public defaultMonth: IMyDefaultMonth;
  public isDisabled = false;
  public submitted: boolean = false;
  selectedIndex: number;

  constructor(fb: FormBuilder, private modalService: NgbModal,
    private clientService: ClientService) {
    console.log(this.isDisabled);
    this.isDisabled = false;
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
    this.clientService.changeStatusRequest(clientId, { status: true }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
      }
    });
  }

  public onRejected(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.changeStatusRequest(clientId, { status: false }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
      }
    });
  }

  public onSelectClient(index:number, client): void {
    this.selectedIndex = index;
    console.log(client);
  }
}
