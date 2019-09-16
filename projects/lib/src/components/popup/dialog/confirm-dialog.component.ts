import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';

export interface ConfirmDialogRef {
  yesButtonClick: EventEmitter<ConfirmDialogComponent>;
  close: () => void;
}

@Component({
  selector: 'lego-confirm-dialog',
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialogComponent extends BaseDialogComponent {

  @Input()
  public title: string;

  @Input()
  public message: string;

  @Input('title-icon')
  public titleIcon: string;

  @Input('yes-button-name')
  public yesButtonName = 'Yes';

  @Input('no-button-name')
  public noButtonName = 'No';

  @Output('yes-click')
  public yesClick: EventEmitter<this> = new EventEmitter<this>();

  public handleYesClick() {
    this.yesClick.emit(this);
  }
}
