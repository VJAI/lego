import { Component, Input } from '@angular/core';

@Component({
  selector: 'lego-menu-left-item',
  template: '<a [href]="url">{{display}}</a>'
})
export class MenuLeftItemComponent {

  @Input()
  public url: string;

  @Input()
  public display: string;
}
