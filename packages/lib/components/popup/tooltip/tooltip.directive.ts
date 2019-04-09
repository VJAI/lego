import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input, OnDestroy, Renderer2
} from '@angular/core';
import { Function } from 'estree';
import { TooltipComponent } from './tooltip.component';

enum TooltipStatus {
  AboutToShow = 'abouttoshow',
  AppendedToDom = 'appended',
  ShowStarted = 'showstarted',
  Showing = 'showing',
  AboutToHide = 'abouttohide',
  Hiding = 'hiding',
  Hidden = 'hidden'
}

let currentToolTip: ComponentRef<TooltipComponent> = null;

@Directive({
  selector: '[lego-tooltip]'
})
export class TooltipDirective implements OnDestroy {

  @Input('lego-tooltip')
  public text: string;

  private _darkMode = false;

  public get darkMode(): boolean {
    return this._darkMode;
  }

  @Input('dark-mode')
  public set darkMode(value: boolean) {
    this._darkMode = coerceBooleanProperty(value);
  }

  private _showOnDemand = false;

  public get showOnDemand(): boolean {
    return this._showOnDemand;
  }

  @Input('on-demand')
  public set showOnDemand(value: boolean) {
    this._showOnDemand = coerceBooleanProperty(value);
  }

  @Input('tooltip-length')
  public maxLength = 500;

  private showDelay = 150;

  private hideDelay = 500;

  private showDelayTimer: number = null;

  private showNextTickTimer: number = null;

  private hideDelayTimer: number = null;

  private overlayRef: OverlayRef;

  private tooltipRef: ComponentRef<TooltipComponent> = null;

  private status = TooltipStatus.Hidden;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private componentRenderer: Renderer2) {
    this.componentRenderer.addClass(this.elementRef.nativeElement, 'lego-tooltip-host');
    this.onHide = this.onHide.bind(this);
    this.onShow = this.onShow.bind(this);
  }

  @HostListener('mouseenter')
  public show() {
    if (this.showOnDemand && this.elementRef.nativeElement.scrollWidth <= this.elementRef.nativeElement.offsetWidth) {
      return;
    }

    if ([TooltipStatus.AboutToShow, TooltipStatus.ShowStarted, TooltipStatus.Showing].indexOf(this.status) > -1) {
      return;
    }

    this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);
    this.unListenTransitionEnd(this.onHide);
    this.hideDelayTimer = null;

    if (this.status === TooltipStatus.AboutToHide) {
      this.status = TooltipStatus.Showing;
      return;
    }

    if (this.status === TooltipStatus.Hiding) {
      this.showTooltip();
      return;
    }

    this.showDelayTimer = window.setTimeout(() => this._show(), this.showDelay);
    this.status = TooltipStatus.AboutToShow;
  }

  @HostListener('mouseleave')
  public hide() {
    if ([TooltipStatus.AboutToHide, TooltipStatus.Hiding, TooltipStatus.Hidden].indexOf(this.status) > -1) {
      return;
    }

    this.showDelayTimer && window.clearTimeout(this.showDelayTimer);
    this.showNextTickTimer && window.clearTimeout(this.showNextTickTimer);
    this.unListenTransitionEnd(this.onShow);
    this.showDelayTimer = null;
    this.showNextTickTimer = null;

    if (this.status === TooltipStatus.AboutToShow) {
      this.status = TooltipStatus.Hidden;
      return;
    }

    if (this.status === TooltipStatus.AppendedToDom) {
      this.overlayRef.detach();
      this.tooltipRef.destroy();
      this.tooltipRef = null;
      this.status = TooltipStatus.Hidden;
      return;
    }

    if (this.status === TooltipStatus.ShowStarted) {
      this.hideTooltip();
      return;
    }

    this.hideDelayTimer = window.setTimeout(() => this._hide(), this.hideDelay);
    this.status = TooltipStatus.AboutToHide;
  }

  public ngOnDestroy() {
    this.overlayRef && this.overlayRef.dispose();
    this.overlayRef = null;
  }

  private _show() {
    this.showDelayTimer = null;

    if (!this.overlayRef) {
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([{
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        }, {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        }]);

      this.overlayRef = this.overlay.create({ positionStrategy });
    }

    currentToolTip && currentToolTip.instance.connectedDirective !== this && currentToolTip.instance.dispose();
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    this.tooltipRef = this.overlayRef.attach(tooltipPortal);
    currentToolTip = this.tooltipRef;
    this.tooltipRef.instance.text = this.getTooltipText();
    this.tooltipRef.instance.isDark = this.darkMode;
    this.tooltipRef.instance.connectedDirective = this;

    this.tooltipRef.instance.mouseEnterCb = () => {
      if ([TooltipStatus.AboutToShow, TooltipStatus.ShowStarted, TooltipStatus.Showing].indexOf(this.status) > -1) {
        return;
      }

      this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);
      this.unListenTransitionEnd(this.onHide);
      this.hideDelayTimer = null;

      if (this.status === TooltipStatus.AboutToHide || this.status === TooltipStatus.Hiding) {
        this.showTooltip();
      }
    };

    this.tooltipRef.instance.mouseLeaveCb = () => this.hide();

    this.tooltipRef.instance.disposeCb = () => {
      if (this.status === TooltipStatus.Hiding || this.status === TooltipStatus.Hidden) {
        return;
      }

      this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);
      this.hideDelayTimer = null;
      this.hideTooltip();
    };

    this.status = TooltipStatus.AppendedToDom;

    this.showNextTickTimer = window.setTimeout(() => {
      this.showNextTickTimer = null;
      this.showTooltip();
    });
  }

  private _hide() {
    this.hideDelayTimer = null;
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltipRef.instance.show();
    this.status = TooltipStatus.ShowStarted;
    this.listenTransitionEnd(this.onShow);
  }

  private onShow() {
    this.status = TooltipStatus.Showing;
    this.unListenTransitionEnd(this.onShow);
  }

  private hideTooltip() {
    this.tooltipRef.instance.hide();
    this.status = TooltipStatus.Hiding;
    this.listenTransitionEnd(this.onHide);
  }

  private onHide() {
    this.unListenTransitionEnd(this.onHide);
    this.overlayRef.detach();
    this.tooltipRef.destroy();
    this.tooltipRef = null;
    this.status = TooltipStatus.Hidden;
  }

  private listenTransitionEnd(fn: () => void) {
    this.tooltipRef && this.tooltipRef.instance.el.nativeElement.addEventListener('transitionend', fn);
  }

  private unListenTransitionEnd(fn: () => void) {
    this.tooltipRef && this.tooltipRef.instance.el.nativeElement.removeEventListener('transitionend', fn);
  }

  private getTooltipText(): string {
    let text: string = this.text ? this.text.trim() : this.elementRef.nativeElement.innerText.trim();

    if (text.length > this.maxLength) {
      text = text.substring(0, this.maxLength - 3) + '...';
    }

    return text;
  }
}
