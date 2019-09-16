import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';

@Component({
  selector: 'lego-dialog',
  templateUrl: './dialog.html'
})
export class DialogComponent extends LegoBaseComponent {

  @Input('title-icon')
  public titleIcon: string;

  @Input('overlay-ref')
  public overlayRef: OverlayRef;

  @Output('close')
  public closeDialog: EventEmitter<this> = new EventEmitter<this>();

  public close() {
    this.overlayRef.dispose();
  }
}
