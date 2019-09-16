import { Component, forwardRef, Input } from '@angular/core';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { Child, Parent } from '../../lego-base.component';

@Component({
  selector: 'lego-button-group',
  templateUrl: './button-group.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ButtonGroupComponent) },
    { provide: Child, useExisting: forwardRef(() => ButtonGroupComponent) }
  ]
})
export class ButtonGroupComponent extends LegoBaseInputComponent<string> {

  @Input()
  public selected: string;

  @Input()
  public set data(value: string) {
    this.selected = value;
  }

  public get data() {
    return this.selected;
  }
}
