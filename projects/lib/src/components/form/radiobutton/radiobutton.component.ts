import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { Child } from '../../lego-base.component';
import { LegoBaseInputComponent } from '../lego-base-input.component';

@Component({
  selector: 'lego-radiobutton',
  templateUrl: './radiobutton.html',
  providers: [
    { provide: Child, useExisting: forwardRef(() => RadioButtonComponent) }
  ]
})
export class RadioButtonComponent extends LegoBaseInputComponent<string> {

  private _horizontal = false;

  public get horizontal() {
    return this._horizontal;
  }

  @HostBinding('class.horizontal')
  @Input()
  public set horizontal(value: boolean) {
    this._horizontal = coerceBooleanProperty(value);
  }

  @Input()
  public selected: string;

  public get data() {
    return this.selected;
  }

  @Input()
  public set data(value: string) {
    this.selected = value;
  }
}
