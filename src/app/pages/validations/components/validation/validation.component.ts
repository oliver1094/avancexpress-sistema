import { Component, OnInit, ViewChild, EventEmitter, NgZone, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../service/client.service';
import { FileItem } from '../../../../models/file-item';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';

@Component({
  selector: 'validation',
  templateUrl: './validation.html',
  styleUrls: ['./validation.scss']
})
export class ValidationComponent {
  public archivosAlreadyUpdated: FileItem[] = [];
  public archivosAlreadyUpdatedC: FileItem[] = [];
  public pdfSrc: string;
  public pdfSrc_1: string;
  public pdfSrc_2: string;
  public array = [];
  public clientsArray = [];
  public submitted: boolean = false;
  @ViewChild('fileInput')
  myInputVariable: any;
  public archivos: FileItem[] = [];  
  public files: FormData[] = [];
  public dataFile: File[] = [];
  public searchValue: any;
  private idClient: number;
  private token = window.localStorage.getItem('access_token');  
  selectedIndex: number;
  formData: FormData;
  files1: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  //private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://avancexpress-api.herokuapp.com';

  constructor(fb: FormBuilder, private modalService: NgbModal,
    private clientService: ClientService) {
    this.array = ['1', '2', '3', '4', '5'];

    console.log(this.clientsArray);
    this.clientService.getClients().subscribe((res) => {
      console.log(res.clients);
      this.clientsArray = res.clients;

    });
    console.log(this.clientsArray);    

    this.options = { concurrency: 1, allowedContentTypes: ['image/png', 'image/jpeg', 'application/pdf'] };
    this.files1 = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;        
    
  }

  getFilesFromClient() {
    this.files1 = [];
    this.archivosAlreadyUpdated = [];
    this.clientService.getContractClientFiles(this.idClient).subscribe((res) => {
        console.log(res);
        const files = res.files;
        for (const file of files) {
            console.log(file);
            const fileItem = new FileItem(null);
            fileItem.nombreArchivo = file.name;
            fileItem.url = this.baseUrl + file.url;
            this.archivosAlreadyUpdated.push(fileItem);
        }
    });
}

  public onAccepted(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.validateThird(clientId, { status: true }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;        
        this.pdfSrc = '';
        this.pdfSrc_1 = '';
        this.pdfSrc_2 = '';
        this.archivosAlreadyUpdated = [];
        this.archivosAlreadyUpdatedC = [];
      }
    });
  }

  public onRejected(clientId: number, index: number) {
    console.log(clientId);
    this.clientService.validateThird(clientId, { status: false }).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.clientsArray.splice(index, 1);
        this.selectedIndex = -1;        
        this.pdfSrc = '';
        this.pdfSrc_1 = '';
        this.pdfSrc_2 = '';
        this.archivosAlreadyUpdated = [];
        this.archivosAlreadyUpdatedC = [];
      }
    });
  }
  public onSelectClient(index: number, client): void {
    this.archivosAlreadyUpdatedC = [];  
    this.archivosAlreadyUpdated = [];  
    this.selectedIndex = index;
    this.idClient = client.id;
    const fileItemCaratula = new FileItem(null);
    fileItemCaratula.nombreArchivo = client.id + '_Caratula_' +
      client.name + client.last_name + '.pdf';
    fileItemCaratula.url = this.baseUrl + '/files_clients/' + client.id + '_caratula_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdatedC.push(fileItemCaratula);
    const fileItemContrato = new FileItem(null);
    fileItemContrato.nombreArchivo = client.id + '_Contrato_' +
      client.name + client.last_name + '.pdf';
    fileItemContrato.url = this.baseUrl + '/files_clients/' + client.id + '_contrato_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdatedC.push(fileItemContrato);
    const fileItemCarta = new FileItem(null);
    fileItemCarta.nombreArchivo = client.id + '_Carta_' +
      client.name + client.last_name + '.pdf';;
    fileItemCarta.url = this.baseUrl + '/files_clients/' + client.id + '_carta_' +
      client.name + client.last_name + '.pdf';
    this.archivosAlreadyUpdatedC.push(fileItemCarta);

    this.pdfSrc = this.archivosAlreadyUpdatedC[0].url;
    this.pdfSrc_1 = this.archivosAlreadyUpdatedC[1].url;
    this.pdfSrc_2 = this.archivosAlreadyUpdatedC[2].url;
    this.getFilesFromClient();

  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
        this.files1.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.get('id') === output.file.id);
        this.files1[index] = output.file;
    } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files1 = this.files1.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
        this.dragOver = true;
    } else if (output.type === 'dragOut') {
        this.dragOver = false;
    } else if (output.type === 'drop') {
        this.dragOver = false;
    }  else if (output.type === 'done') {
        this.getFilesFromClient();
    }

    this.files1 = this.files1.filter(file => file.progress.status !== UploadStatus.Done);
}

startUpload(): void {
    const event: UploadInput = {
        type: 'uploadAll',
        url: this.baseUrl + '/v1/clients/upload_contract_files?client_id=' + this.idClient,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        }
    };

    this.uploadInput.emit(event);        
}

cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
}

removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
}

removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
}
}
