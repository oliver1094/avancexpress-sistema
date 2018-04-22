export class FileItem {
    public id
    public archivo: File
    public nombreArchivo: string
    public url: string = ''
    public isIfe: boolean = false

    constructor(archivo: File) {
        if (archivo) {
            this.archivo = archivo;
            this.nombreArchivo = archivo.name;
        }
    }
}