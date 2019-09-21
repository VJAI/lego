import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lego-menu-left-item',
  template: '<a *ngIf="!external" [routerLink]="url">{{display}}</a><a *ngIf="external" [href]="url" target="_blank">{{display}}</a>'
})
export class MenuLeftItemComponent {

  @Input()
  public url: string;

  private _external = false;

  public get external() {
    return this._external;
  }

  @Input()
  public set external(value: boolean) {
    this._external = coerceBooleanProperty(value);
  }

  @Input()
  public display: string;
}
