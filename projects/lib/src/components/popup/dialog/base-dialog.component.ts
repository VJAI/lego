import { OverlayRef } from '@angular/cdk/overlay';
import { Input, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog.component';

export type BaseDialogComponentType = new() => BaseDialogComponent;

export abstract class BaseDialogComponent {

  @Input('overlay-ref')
  public overlayRef: OverlayRef;

  @ViewChild(DialogComponent, { static : false })
  public dialog: DialogComponent;

  public close() {
    this.dialog.close();
  }
}
