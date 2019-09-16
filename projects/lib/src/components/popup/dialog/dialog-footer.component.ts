import { Component } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-dialog-footer',
  template: '<ng-content></ng-content>'
})
export class DialogFooterComponent extends LegoBaseComponent {

}
