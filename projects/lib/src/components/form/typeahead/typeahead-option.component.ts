import { Highlightable } from '@angular/cdk/a11y';
import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { Child, LegoBaseComponent } from '../../lego-base.component';
import { TypeaheadComponent } from './typeahead.component';

@Component({
  selector: 'lego-typeahead-option',
  templateUrl: './typeahead-option.html',
  providers: [{ provide: Child, useExisting: forwardRef(() => TypeaheadOptionComponent) }]
})
export class TypeaheadOptionComponent extends LegoBaseComponent implements Highlightable {

  @Input()
  public item: any;

  @Input('id-string')
  public idString = 'id';

  @Input('value-string')
  public valueString = 'value';

  public get key(): string {
    return this.item ? this.item[this.idString] : null;
  }

  public get value(): string {
    return this.item ? this.item[this.valueString] : null;
  }

  public get typeahead(): TypeaheadComponent {
    return <TypeaheadComponent>this.parent.parent;
  }

  public $this = this;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.multiple ? (this.typeahead.data || []).indexOf(this.key) > -1 : this.typeahead.data === this.key;
  }

  @HostBinding('class.multiple')
  public get multiple(): boolean {
    return this.typeahead.multiple;
  }

  @HostBinding('class.active')
  public active = false;

  public disabled = false;

  public getLabel(): string {
    return this.value;
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

    event.preventDefault();
    event.stopPropagation();

    this.typeahead.selectOption(this);
  }
}
