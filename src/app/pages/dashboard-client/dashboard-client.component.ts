import { Component, OnInit, ViewChild, EventEmitter, NgZone, Inject } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';


@Component({
    selector: 'app-dashboard-client',
    templateUrl: './dashboard-client.component.html',
    styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
    formData: FormData;
    files1: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;

    @ViewChild('fileInput')
    myInputVariable: any;
    public archivos: FileItem[] = [];
    public archivosAlreadyUpdated: FileItem[] = [];
    public files: FormData[] = [];
    public dataFile: File[] = [];
    public searchValue: any;
    public client: any;
    private idClient: number;
    private maxSize = 1024 * 1024 * 5;
    public maxSizeInvalid = false;
    private token = window.localStorage.getItem('access_token');
    //private baseUrl = 'http://localhost:3000';
    private baseUrl = 'https://avancexpress-api.herokuapp.com';
    filesToUpload: Array<File> = [];
    input = 0;
    sectors = [{
        from: 0,
        to: 25,
        color: 'green'
    }, {
        from: 26,
        to: 50,
        color: 'yellow'
    }, {
        from: 51,
        to: 75,
        color: 'red'
    }, {
        from: 76,
        to: 100,
        color: 'black'
    }];
    constructor(private http: Http, private activatedRoute: ActivatedRoute,
        private clientService: ClientService) {
        this.options = {
            concurrency: 1,
            allowedContentTypes: ['image/png', 'image/jpg', 'application/pdf'],
        };
        this.files1 = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
        this.activatedRoute.params.subscribe(params => {
            this.idClient = params['id'];
        });

        this.getFilesFromClient();
    }

    ngOnInit() { }

    getFilesFromClient() {
        this.client = [];
        this.files1 = [];
        this.archivosAlreadyUpdated = [];
        this.clientService.getClientFiles(window.localStorage.getItem('client_key')).subscribe((res) => {
            console.log(res);
            const files = res.files;
            this.client = res.data_client;
            console.log(this.client);
            for (const file of files) {
                console.log(file);
                const fileItem = new FileItem(null);
                fileItem.nombreArchivo = file.name;
                fileItem.url = this.baseUrl + file.url;
                this.archivosAlreadyUpdated.push(fileItem)
            }
            if (this.archivosAlreadyUpdated.length >= 5) {
                $("#notificationFiles").modal('show');
            }
        });
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
            console.log(output);
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added            
            const fileSize = output.file.size;
            if (fileSize <= this.maxSize) {
                console.log('insertar');
                this.files1.push(output.file);
                console.log(output.file.size);
                this.maxSizeInvalid = false;
            } else {
                this.maxSizeInvalid = true;
                console.log('no insertar');
            }
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
        } else if (output.type === 'done') {
            this.getFilesFromClient();
        }

        this.files1 = this.files1.filter(file => file.progress.status !== UploadStatus.Done);
    }

    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: this.baseUrl + '/v1/clients/upload_files?client_id=' + this.idClient,
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
