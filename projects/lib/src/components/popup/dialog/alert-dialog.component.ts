import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { MessageType } from '../../message-type';
import { BaseDialogComponent } from './base-dialog.component';

@Component({
  selector: 'lego-alert-dialog',
  templateUrl: './alert-dialog.html'
})
export class AlertDialogComponent extends BaseDialogComponent {

  @Input()
  public title: string;

  @Input()
  public message: string;

  @Input('message-type')
  public messageType = MessageType.Info;

  public get titleIcon(): string {
    if (this.messageType === MessageType.Success) {
      return 'Status_Success';
    } else if (this.messageType === MessageType.Error) {
      return 'Status_Error';
    } else if (this.messageType === MessageType.Warning) {
      return 'Status_Warning';
    } else {
      return 'Info_Circle';
    }
  }
}
