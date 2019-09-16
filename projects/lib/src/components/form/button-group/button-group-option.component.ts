import { Component, Input, Injector, SkipSelf, Optional, forwardRef, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { Child, Parent } from '../../lego-base.component';
import { ButtonGroupComponent } from './button-group.component';

@Component({
  selector: 'lego-button-group-option',
  templateUrl: './button-group-option.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ButtonGroupOptionComponent) },
    { provide: Child, useExisting: forwardRef(() => ButtonGroupOptionComponent) }
  ]
})
export class ButtonGroupOptionComponent extends LegoBaseInputComponent<string> {

  @Input()
  public key: string;

  @Input()
  public value: string;

  public parent: ButtonGroupComponent;

  constructor(protected injector: Injector,
              @Optional() @SkipSelf() parent: ButtonGroupComponent,
              @Self() @Optional() public control: NgControl) {
    super(injector, parent, control);
  }

  public onChange($event) {
    this.parent.data = this.keyOrValue;
    this.parent.onChange($event);
  }

  public onTouched() {
    return this.parent.onTouched();
  }

  public get keyOrValue() {
    return this.key || this.value;
  }
}
