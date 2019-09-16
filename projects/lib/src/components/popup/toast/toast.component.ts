import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { MessageType } from '../../message-type';
import { LegoBasePopupComponent } from '../lego-base-popup.component';

@Component({
  selector: 'lego-toast',
  templateUrl: './toast.html',
  animations: [trigger('fadeAnimation', [
    state('default', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [style({ opacity: 0, transform: 'translateX(100px)' }), animate('{{ showDelay }}ms')]),
    transition(
      'default => closing',
      animate('{{ hideDelay }}ms', style({ opacity: 0, transform: 'translateX(100px)' }))
    )
  ])]
})
export class ToastComponent extends LegoBasePopupComponent implements OnInit, OnDestroy {

  @Input()
  public title: string;

  @Input()
  public message: string;

  @Input('message-type')
  public messageType = MessageType.Info;

  @Input('auto-close')
  public autoClose = true;

  public disposeFn: () => void = null;

  public animationState: 'default' | 'closing' = 'default';

  public showDelay = 200;

  public duration = 2000;

  public hideDelay = 500;

  public intervalId: number = null;

  public get toastCssClasses(): string {
    if (this.messageType === MessageType.Success) {
      return 'lego-toast-success';
    } else if (this.messageType === MessageType.Error) {
      return 'lego-toast-error';
    } else if (this.messageType === MessageType.Warning) {
      return 'lego-toast-warning';
    } else {
      return 'lego-toast-info';
    }
  }

  public get toastIcon() {
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

  public ngOnInit() {
    this.intervalId = window.setTimeout(() => this.animationState = 'closing', this.duration);
  }

  public onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = toState === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  public ngOnDestroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  public close() {
    this.disposeFn && this.disposeFn();
  }
}
