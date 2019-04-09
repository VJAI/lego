import { OverlayRef } from '@angular/cdk/overlay';
import { Input } from '@angular/core';

export type BaseDialogComponentType = new() => BaseDialogComponent;

export abstract class BaseDialogComponent {

  @Input('overlay-ref')
  public overlayRef: OverlayRef;
}
