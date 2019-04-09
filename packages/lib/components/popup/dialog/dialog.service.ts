import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/portal/typings/portal';
import { Injectable } from '@angular/core';
import { MessageType } from '../../message-type';
import { AlertDialogComponent } from './alert-dialog.component';
import { BaseDialogComponentType } from './base-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogRef } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private overlay: Overlay) {}

  public alert(title: string, message: string, messageType = MessageType.Info) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true
    });
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    const dialogPortal = new ComponentPortal(AlertDialogComponent);
    const dialogRef = overlayRef.attach(dialogPortal);
    dialogRef.instance.title = title;
    dialogRef.instance.message = message;
    dialogRef.instance.messageType = messageType;
    dialogRef.instance.overlayRef = overlayRef;
  }

  public confirm(title: string, message: string, yesButtonName?: string, noButtonName?: string): ConfirmDialogRef {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true
    });
    const dialogPortal = new ComponentPortal(ConfirmDialogComponent);
    const dialogRef = overlayRef.attach(dialogPortal);
    dialogRef.instance.title = title;
    dialogRef.instance.message = message;
    yesButtonName && (dialogRef.instance.yesButtonName = yesButtonName);
    noButtonName && (dialogRef.instance.noButtonName = noButtonName);
    dialogRef.instance.overlayRef = overlayRef;

    return <ConfirmDialogRef> {
      yesButtonClick: dialogRef.instance.yesClick
    };
  }

  public open(dialog: BaseDialogComponentType) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true
    });
    const dialogPortal = new ComponentPortal(dialog);
    const dialogRef = overlayRef.attach(dialogPortal);
    dialogRef.instance.overlayRef = overlayRef;
  }
}
