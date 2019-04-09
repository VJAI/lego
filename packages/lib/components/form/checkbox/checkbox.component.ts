import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input } from '@angular/core';
import { Child } from '../../lego-base.component';
import { LegoBaseInputComponent } from '../lego-base-input.component';

@Component({
  selector: 'lego-checkbox',
  templateUrl: './checkbox.html',
  providers: [
    { provide: Child, useExisting: forwardRef(() => CheckboxComponent) }
  ]
})
export class CheckboxComponent extends LegoBaseInputComponent<boolean> {

  @Input()
  public value: string;

  private _checked = false;

  public get checked(): boolean {
    return this._checked;
  }

  @Input()
  public set checked(value: boolean) {
    this._checked = coerceBooleanProperty(value);
  }

  public get data() {
    return this.checked;
  }

  @Input()
  public set data(value: boolean) {
    this.checked = coerceBooleanProperty(value);
  }
}
