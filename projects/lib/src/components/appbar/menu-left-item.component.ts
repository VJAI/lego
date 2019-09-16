import { Component, Input } from '@angular/core';

@Component({
  selector: 'lego-menu-left-item',
  template: '<a [routerLink]="url">{{display}}</a>'
})
export class MenuLeftItemComponent {

  @Input()
  public url: string;

  @Input()
  public display: string;
}
