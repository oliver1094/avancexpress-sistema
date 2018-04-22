import {ComponentCanDeactivate} from './component-can-deactive';
import {NgForm, FormGroup} from "@angular/forms";

export abstract class FormCanDeactivate extends ComponentCanDeactivate{

 abstract get form():FormGroup;
 
 canDeactivate():boolean{
     console.log('deactive');     
      return !this.form.dirty
  }
}