import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { Parent } from '../../lego-base.component';
import { LegoBasePopupComponent } from '../lego-base-popup.component';

export enum Orientation {
  Left = 'left',
  Right = 'right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  TopMiddle = 'top-middle',
  LeftAlt = 'left-alt',
  RightAlt = 'right-alt',
  LeftMiddle = 'left-middle',
  RightMiddle = 'right-middle',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  BottomMiddle = 'bottom-middle'
}

enum PopoverStatus {
  AboutToShow = 'abouttoshow',
  AppendedToDom = 'appended',
  ShowStarted = 'showstarted',
  Showing = 'showing',
  AboutToHide = 'abouttohide',
  Hiding = 'hiding',
  Hidden = 'hidden'
}

let currentPopover: PopoverComponent = null;

@Component({
  selector: 'lego-popover',
  templateUrl: './popover.html'
})
export class PopoverComponent extends LegoBasePopupComponent implements OnInit, OnDestroy {

  @Input()
  public trigger: HTMLElement;

  @Input('preferred-orientations')
  public preferredOrientations: Array<Orientation | '*'> = [Orientation.Right, '*'];

  @ViewChild(TemplatePortalDirective, { static : false })
  public popoverTemplate: TemplatePortalDirective;

  public display = false;

  private showDelay = 150;

  private hideDelay = 500;

  private showDelayTimer: number = null;

  private showNextTickTimer: number = null;

  private hideDelayTimer: number = null;

  private overlayRef: OverlayRef;

  private viewRef: EmbeddedViewRef<any>;

  private status = PopoverStatus.Hidden;

  private orientationPositionMap = new Map<Orientation, ConnectedPosition>([
    [Orientation.Right, {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 30,
      panelClass: 'right'
    }],
    [Orientation.RightMiddle, {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 30,
      panelClass: 'right-middle'
    }],
    [Orientation.RightAlt, {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: 30,
      panelClass: 'right-alt'
    }],
    [Orientation.BottomLeft, {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 30,
      panelClass: 'bottom-left'
    }],
    [Orientation.BottomRight, {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 30,
      panelClass: 'bottom-right'
    }],
    [Orientation.BottomMiddle, {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 30,
      panelClass: 'bottom-middle'
    }],
    [Orientation.Left, {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: -30,
      panelClass: 'left'
    }],
    [Orientation.LeftMiddle, {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -30,
      panelClass: 'left-middle'
    }],
    [Orientation.LeftAlt, {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetX: -30,
      panelClass: 'left-alt'
    }],
    [Orientation.TopLeft, {
      originX: 'center',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -30,
      panelClass: 'top-left'
    }],
    [Orientation.TopMiddle, {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -30,
      panelClass: 'top-middle'
    }],
    [Orientation.TopRight, {
      originX: 'center',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -30,
      panelClass: 'top-right'
    }]
  ]);

  constructor(protected injector: Injector,
              @SkipSelf() @Optional() parent: Parent,
              private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
    super(injector, parent);
    this.onTriggerMouseEnter = this.onTriggerMouseEnter.bind(this);
    this.onTriggerMouseLeave = this.onTriggerMouseLeave.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onShow = this.onShow.bind(this);
  }

  public ngOnInit() {
    this.trigger.addEventListener('mouseenter', this.onTriggerMouseEnter);
    this.trigger.addEventListener('mouseleave', this.onTriggerMouseLeave);
  }

  public ngOnDestroy() {
    this.trigger.removeEventListener('mouseenter', this.onTriggerMouseEnter);
    this.trigger.removeEventListener('mouseleave', this.onTriggerMouseLeave);
    this.overlayRef && this.overlayRef.dispose();
    this.overlayRef = null;
  }

  public onMouseEnter() {
    if ([PopoverStatus.AboutToShow, PopoverStatus.ShowStarted, PopoverStatus.Showing].indexOf(this.status) > -1) {
      return;
    }

    this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);

    this.unListenTransitionEnd(this.onHide);
    this.hideDelayTimer = null;

    if (this.status === PopoverStatus.AboutToHide || this.status === PopoverStatus.Hiding) {
      this.showPopover();
    }
  }

  public onMouseLeave() {
    this.onTriggerMouseLeave();
  }

  // @internal
  public hideImmediately() {
    if (this.status === PopoverStatus.Hiding || this.status === PopoverStatus.Hidden) {
      return;
    }

    this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);
    this.hideDelayTimer = null;
    this.hidePopover();
  }

  public onTriggerMouseEnter() {
    if ([PopoverStatus.AboutToShow, PopoverStatus.ShowStarted, PopoverStatus.Showing].indexOf(this.status) > -1) {
      return;
    }

    this.hideDelayTimer && window.clearTimeout(this.hideDelayTimer);
    this.unListenTransitionEnd(this.onHide);
    this.hideDelayTimer = null;

    if (this.status === PopoverStatus.AboutToHide) {
      this.status = PopoverStatus.Showing;
      return;
    }

    if (this.status === PopoverStatus.Hiding) {
      this.showPopover();
      return;
    }

    this.showDelayTimer = window.setTimeout(() => this.show(), this.showDelay);
    this.status = PopoverStatus.AboutToShow;
  }

  public onTriggerMouseLeave() {
    if ([PopoverStatus.AboutToHide, PopoverStatus.Hiding, PopoverStatus.Hidden].indexOf(this.status) > -1) {
      return;
    }

    this.showDelayTimer && window.clearTimeout(this.showDelayTimer);
    this.showNextTickTimer && window.clearTimeout(this.showNextTickTimer);
    this.unListenTransitionEnd(this.onShow);
    this.showDelayTimer = null;
    this.showNextTickTimer = null;

    if (this.status === PopoverStatus.AboutToShow) {
      this.status = PopoverStatus.Hidden;
      return;
    }

    if (this.status === PopoverStatus.AppendedToDom) {
      this.overlayRef.detach();
      this.viewRef.destroy();
      this.viewRef = null;
      this.status = PopoverStatus.Hidden;
      return;
    }

    if (this.status === PopoverStatus.ShowStarted) {
      this.hidePopover();
      return;
    }

    this.hideDelayTimer = window.setTimeout(() => this.hide(), this.hideDelay);
    this.status = PopoverStatus.AboutToHide;
  }

  private show() {
    this.showDelayTimer = null;

    const orientations = [...this.orientationPositionMap.keys()];

    let availableOrientations = [];

    this.preferredOrientations.forEach((o: Orientation | '*') => {
      if (o !== '*') {
        availableOrientations.push(this.orientationPositionMap.get(o));
      } else {
        const remainingOrientations = orientations
          .filter(key => this.preferredOrientations.indexOf(key) === -1)
          .map(key => this.orientationPositionMap.get(key));
        availableOrientations = [...availableOrientations, ...remainingOrientations];
      }
    });

    if (!this.overlayRef) {
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.trigger)
        .withPush(false)
        .withFlexibleDimensions()
        .withPositions(availableOrientations);

      this.overlayRef = this.overlay.create({ positionStrategy });
    }

    currentPopover && currentPopover !== this && currentPopover.hideImmediately();
    currentPopover = this;

    this.viewRef = this.overlayRef.attach(this.popoverTemplate);
    this.status = PopoverStatus.AppendedToDom;

    this.showNextTickTimer = window.setTimeout(() => {
      this.showNextTickTimer = null;
      this.showPopover();
    });
  }

  private hide() {
    this.hideDelayTimer = null;
    this.hidePopover();
  }

  private showPopover() {
    this.status = PopoverStatus.ShowStarted;
    this.display = true;
    this.listenTransitionEnd(this.onShow);
  }

  private onShow() {
    this.status = PopoverStatus.Showing;
    this.unListenTransitionEnd(this.onShow);
  }

  private hidePopover() {
    this.display = false;
    this.status = PopoverStatus.Hiding;
    this.listenTransitionEnd(this.onHide);
  }

  private onHide() {
    this.unListenTransitionEnd(this.onHide);
    this.overlayRef.detach();
    this.viewRef.destroy();
    this.viewRef = null;
    this.status = PopoverStatus.Hidden;
  }

  private listenTransitionEnd(fn: () => void) {
    this.viewRef && this.viewRef.rootNodes[0].addEventListener('transitionend', fn);
  }

  private unListenTransitionEnd(fn: () => void) {
    this.viewRef && this.viewRef.rootNodes[0].removeEventListener('transitionend', fn);
  }
}
