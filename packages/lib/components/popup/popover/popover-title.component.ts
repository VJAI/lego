import { Component, Input } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-popover-title',
  template: `<h4 *ngIf="title">{{title}}</h4><ng-content></ng-content>`
})
export class PopoverTitleComponent extends LegoBaseComponent {

  @Input()
  public title: string;
}
