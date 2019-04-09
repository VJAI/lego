import { Component } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-dialog-header',
  template: '<ng-content></ng-content>'
})
export class DialogHeaderComponent extends LegoBaseComponent {

}
