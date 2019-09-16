import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input } from '@angular/core';
import { Child, Parent } from '../../lego-base.component';
import { LegoBaseInputComponent } from '../lego-base-input.component';

@Component({
  selector: 'lego-switch',
  templateUrl: './switch.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => SwitchComponent) },
    { provide: Child, useExisting: forwardRef(() => SwitchComponent) }
  ]
})
export class SwitchComponent extends LegoBaseInputComponent<boolean> {

  @Input('active-text')
  public activeText = 'ON';

  @Input('inactive-text')
  public inactiveText = 'OFF';

  @Input()
  public value: string;

  public get checked() {
    return this.data;
  }

  @Input()
  public set checked(value: boolean) {
    this.data = coerceBooleanProperty(value);
  }

  private _hideLabel = false;

  public get hideLabel() {
    return this._hideLabel;
  }

  @Input('hide-label')
  public set hideLabel(value: boolean) {
    this._hideLabel = coerceBooleanProperty(value);
  }
}
