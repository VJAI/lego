import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { Child, LegoBaseComponent } from '../../lego-base.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'lego-select-option',
  templateUrl: './select-option.html',
  providers: [{ provide: Child, useExisting: forwardRef(() => SelectOptionComponent) }]
})
export class SelectOptionComponent extends LegoBaseComponent {

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

  public get keyOrValue(): string {
    return this.key || this.value;
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

  private _selectAll = false;

  public get selectAll(): boolean {
    return this._selectAll;
  }

  @Input('select-all')
  public set selectAll(value: boolean) {
    this._selectAll = coerceBooleanProperty(value);
  }

  private _clear = false;

  public get clear(): boolean {
    return this._clear;
  }

  @Input()
  public set clear(value: boolean) {
    this._clear = coerceBooleanProperty(value);
  }

  public get select(): SelectComponent {
    if (this.selectAll || this.clear) {
      return <SelectComponent>this.parent.parent;
    }

    return <SelectComponent>this.parent;
  }

  @HostBinding('class.selected')
  public get selected(): boolean {
    if (this.selectAll) {
      return this.select.selectedAll;
    }

    if (this.clear) {
      return !this.select.isSelected;
    }

    return [this.select.selectedOption, ...this.select.selectedOptions].indexOf(this) > -1;
  }

  @HostBinding('class.multiple')
  public get multiple(): boolean {
    return this.select.multiple;
  }

  @HostBinding('class.active')
  public active = false;

  public getLabel(): string {
    return this.inputValue;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    if (this.disabled) {
      return;
    }

    this.select.selectOption(this);

    event.preventDefault();
    event.stopPropagation();
  }
}
