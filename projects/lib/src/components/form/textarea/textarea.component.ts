import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LegoBaseInputComponent } from '../lego-base-input.component';

@Component({
  selector: 'lego-textarea',
  templateUrl: './textarea.html'
})
export class TextAreaComponent extends LegoBaseInputComponent<string> {

  @Input()
  public rows: number;

  @Input('maxlength')
  public maxLength: number;

  @Input()
  public placeholder: string;

  public get value(): string {
    return this.data;
  }

  @Input()
  public set value(value: string) {
    this.data = value;
  }

  @Output()
  public input: EventEmitter<TextAreaComponent> = new EventEmitter<TextAreaComponent>();

  public onInput() {
    this.onChangeFn(this.data);
    this.input.emit(this);
  }
}
