import { Component, forwardRef, Input } from '@angular/core';
import { LegoBaseInputComponent } from '../form/lego-base-input.component';
import { Child, Parent } from '../lego-base.component';
import { ButtonBehavior } from './button.behavior';
import { ButtonType } from './button.type';

@Component({
  selector: 'lego-button',
  templateUrl: './button.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ButtonComponent) },
    { provide: Child, useExisting: forwardRef(() => ButtonComponent) }
  ]
})
export class ButtonComponent extends LegoBaseInputComponent<string> {

  @Input()
  public type: ButtonType = ButtonType.Primary;

  @Input()
  public behavior: ButtonBehavior = ButtonBehavior.Button;

  public get buttonCssClasses(): Array<string> {
    const cssClasses: Array<string> = [];

    if (!this.disabled) {
      cssClasses.push(this.type);
    }

    return cssClasses;
  }
}
