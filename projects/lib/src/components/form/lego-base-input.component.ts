import {
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  SkipSelf
} from '@angular/core';
import {
  NgControl, NgForm
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { LegoBaseComponent, Parent } from '../lego-base.component';

export abstract class LegoBaseInputComponent<T> extends LegoBaseComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public name: string;

  protected _data: T;

  public get data(): T {
    return this._data;
  }

  @Input()
  public set data(value: T) {
    this._data = value;
  }

  private _required = false;

  public get required() {
    return this._required;
  }

  @Input('required')
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  private _readonly = false;

  public get readonly() {
    return this._readonly;
  }

  @Input('readonly')
  public set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }

  protected _disabled = false;

  public get disabled() {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.disabled')
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input('required-err-message')
  public requiredErrMessage = '{label} is required.';

  private _hideError = false;

  public get hideError() {
    return this._hideError;
  }

  @Input('hide-error')
  public set hideError(value: boolean) {
    this._hideError = coerceBooleanProperty(value);
  }

  public get showError(): boolean {
    if (this.hideError || !this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched || (this.form && this.form.submitted)) : false;
  }

  @Input()
  public form: NgForm;

  protected errorMessages = new Map<string, () => string>();

  @Output()
  public change: EventEmitter<this> = new EventEmitter<this>();

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  constructor(protected injector: Injector,
              @Optional() @SkipSelf() parent: Parent,
              @Self() @Optional() public control: NgControl) {
    super(injector, parent);
    this.control && (this.control.valueAccessor = this);
  }

  public ngOnInit() {
    this.addDefaultErrorMessages();
    this.addErrorMessages();
  }

  public writeValue(obj: any): void {
    this.data = <T>obj;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onChange(event?: UIEvent) {
    this.onChangeFn(this.data);
    this.fireChangeEvent(event);
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  public get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    const { errors } = this.control;
    return Object.keys(errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
  }

  public fireChangeEvent(event?: UIEvent) {
    event && event.stopPropagation && event.stopPropagation();
    this.change.emit(this);
  }

  protected addDefaultErrorMessages() {
    this.errorMessages.set('required', () => this.requiredErrMessage.replace(/{label}/, this.label));
  }

  protected addErrorMessages() {
  }
}
