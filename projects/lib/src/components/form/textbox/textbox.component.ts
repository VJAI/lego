import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { Datatype } from './datatype';

@Component({
  selector: 'lego-textbox',
  templateUrl: './textbox.html'
})
export class TextboxComponent extends LegoBaseInputComponent<string> {

  @Input('minlength')
  public minLength: number;

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
  public datatype = Datatype.Text;

  public get value(): string {
    return this.data;
  }

  @Input()
  public set value(value: string) {
    this.data = value;
  }

  @Output()
  public input: EventEmitter<TextboxComponent> = new EventEmitter<TextboxComponent>();

  @Input('minlength-err-message')
  public minLengthErrMessage = 'Length should not be less than {minlength} characters.';

  @Input('maxlength-err-message')
  public maxLengthErrMessage = 'Length should not be greater than {maxlength} characters.';

  public onInput() {
    this.onChangeFn(this.data);
    this.input.emit(this);
  }

  protected addErrorMessages() {
    this.minLength && this.errorMessages.set('minlength', () => this.minLengthErrMessage.replace(/{minlength}/, this.minLength.toString()));
    this.maxLength && this.errorMessages.set('maxlength', () => this.maxLengthErrMessage.replace(/{maxlength}/, this.maxLength.toString()));
  }
}
