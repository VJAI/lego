import { Component } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-popover-body',
  template: `<ng-content></ng-content>`
})
export class PopoverBodyComponent extends LegoBaseComponent {
}
