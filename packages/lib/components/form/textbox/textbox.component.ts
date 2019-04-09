import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { Datatype } from './datatype';

@Component({
  selector: 'lego-textbox',
  templateUrl: './textbox.html'
})
export class TextboxComponent extends LegoBaseInputComponent<string> {

  @Input('minlength')
  public minlength: number;

  @Input('maxlength')
  public maxLength: number;

  @Input()
  public placeholder: string;

  @Input('auto-complete')
  public autoComplete: boolean;

  @Input('max-value')
  public maxValue: number;

  @Input('min-value')
  public minValue: number;

  @Input()
  public step: number;

  @Input()
  public datatype: Datatype;

  public get value(): string {
    return this.data;
  }

  @Input()
  public set value(value: string) {
    this.data = value;
  }

  @Input('textbox-size')
  public textboxSize = '0.875rem';

  @Output()
  public input: EventEmitter<TextboxComponent> = new EventEmitter<TextboxComponent>();

  public onInput() {
    this.onChangeFn(this.data);
    this.input.emit(this);
  }
}
