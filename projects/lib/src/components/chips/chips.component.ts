import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, forwardRef, Injector, Input, Optional, Output, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';
import { ChipComponent } from './chip.component';

export interface ChipsDeleteEventArgs {
  chips: ChipsComponent;
  chip: ChipComponent;
}

@Component({
  selector: 'lego-chips',
  template: '<ng-content select="lego-chip"></ng-content>',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ChipsComponent) },
    { provide: Child, useExisting: forwardRef(() => ChipsComponent) }
  ]
})
export class ChipsComponent extends LegoBaseComponent {

  public _delete = false;

  public get delete(): boolean {
    return this._delete;
  }

  @Input()
  public set delete(value: boolean) {
    this._delete = coerceBooleanProperty(value);
  }

  @Output('delete-click')
  public deleteClick: EventEmitter<ChipsDeleteEventArgs> = new EventEmitter<ChipsDeleteEventArgs>();

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }

  // @internal
  public chipDeleteClick(chip: ChipComponent) {
    this.deleteClick.emit({ chips: this, chip: chip });
  }
}
