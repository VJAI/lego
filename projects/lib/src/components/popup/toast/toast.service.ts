import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { MessageType } from '../../message-type';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private overlay: Overlay, private parentInjector: Injector) { }

  private visibleToasts: Array<OverlayRef> = [];

  public success(message: string) {
    this.show(message, MessageType.Success);
  }

  public error(message: string) {
    this.show(message, MessageType.Error);
  }

  public warning(message: string) {
    this.show(message, MessageType.Warning);
  }

  public info(message: string) {
    this.show(message, MessageType.Info);
  }

  private show(message: string, messageType: MessageType) {
    const positionStrategy = this.getPositionStrategy(),
      overlayRef = this.overlay.create({ positionStrategy }),
      toastPortal = new ComponentPortal(ToastComponent),
      tooltipRef = overlayRef.attach(toastPortal);

    tooltipRef.instance.message = message;
    tooltipRef.instance.messageType = messageType;

    tooltipRef.instance.disposeFn = () => {
      const toastRect = overlayRef.overlayElement.getBoundingClientRect(),
        toastHeight = toastRect.height,
        toastIndex = this.visibleToasts.indexOf(overlayRef);

      overlayRef.dispose();

      this.visibleToasts.splice(toastIndex, 1);

      /*const bottomToasts = this.visibleToasts.slice(toastIndex);

      bottomToasts.forEach(toast => {
        const currentTop = toast.overlayElement.getBoundingClientRect().top;
        toast.overlayElement.style.marginTop = currentTop - toastHeight - 10 + 'px';
      });*/
    };

    this.visibleToasts.push(overlayRef);
  }

  private getPositionStrategy() {
    const lastToast = this.visibleToasts[this.visibleToasts.length - 1];
    const topPosition = lastToast ? lastToast.overlayElement.getBoundingClientRect().bottom + 10 : 20;

    return this.overlay.position()
      .global()
      .top(topPosition + 'px')
      .right(20 + 'px');
  }
}
