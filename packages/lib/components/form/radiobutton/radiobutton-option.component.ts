import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Injector, Input, Optional, SkipSelf } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';
import { RadioButtonComponent } from './radiobutton.component';

@Component({
  selector: 'lego-radiobutton-option',
  templateUrl: './radiobutton-option.html'
})
export class RadioButtonOptionComponent extends LegoBaseComponent {

  @Input()
  public key: string;

  public inputValue: string;

  @Input()
  public get value(): string {
    return this.inputValue ? this.inputValue : this.el.nativeElement.innerText.trim();
  }

  public set value(value: string) {
    this.inputValue = value;
  }

  private _disabled = false;

  public get disabled() {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.disabled')
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  public parent: RadioButtonComponent;

  public get keyOrValue() {
    return this.key || this.value;
  }

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: RadioButtonComponent) {
    super(injector, parent);
  }

  public onChange($event) {
    this.parent.data = this.key;
    this.parent.onChange($event);
  }

  public onTouched() {
    return this.parent.onTouched();
  }
}
