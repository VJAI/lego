import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { Child, LegoBaseComponent } from '../lego-base.component';
import { ChipsComponent } from './chips.component';

@Component({
  selector: 'lego-chip',
  template: `
    <ng-content></ng-content><ng-container *ngIf="value">{{inputValue}}</ng-container>
    <lego-icon *ngIf="delete" class="delete" icon="Cross" (click)="onDeleteClick($event)"></lego-icon>
  `,
  providers: [
    { provide: Child, useExisting: forwardRef(() => ChipComponent) }
  ]
})
export class ChipComponent extends LegoBaseComponent {

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

  public get chips(): ChipsComponent {
    return <ChipsComponent>this.parent;
  }

  public get delete(): boolean {
    return this.chips.delete;
  }

  @Output('delete-click')
  public deleteClick: EventEmitter<ChipComponent> = new EventEmitter<ChipComponent>();

  public onDeleteClick(event: UIEvent) {
    this.deleteClick.emit(this);
    this.chips.chipDeleteClick(this);
    event.stopPropagation();
  }
}
