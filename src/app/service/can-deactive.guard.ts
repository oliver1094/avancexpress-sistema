import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ComponentCanDeactivate} from './component-can-deactive';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
   console.log('en el guard');
    if(!component.canDeactivate()){
        if (confirm("La información llenada en este paso del registro se perderá, ¿continuar de todos modos?")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}
