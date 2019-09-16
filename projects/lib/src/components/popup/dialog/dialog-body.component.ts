import { Component } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-dialog-body',
  template: '<ng-content></ng-content>'
})
export class DialogBodyComponent extends LegoBaseComponent {

}
