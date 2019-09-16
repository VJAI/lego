import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import {
  Component,
  EmbeddedViewRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../../lego-base.component';

@Component({
  selector: 'lego-dropdown',
  templateUrl: './dropdown.html',
  providers: [
    { provide: Child, useExisting: forwardRef(() => DropdownComponent) },
    { provide: Parent, useExisting: forwardRef(() => DropdownComponent) }
  ]
})
export class DropdownComponent extends LegoBaseComponent implements OnDestroy {

  @Input()
  public reference: HTMLElement;

  @Input('min-width')
  public minWidth = 0;

  @Input('max-width')
  public maxWidth = Infinity;

  @Input('sync-width')
  public syncWidth = true;

  @Input('css-classes')
  public cssClasses = '';

  @Output('show')
  public visible: EventEmitter<this> = new EventEmitter<this>();

  @Output('hide')
  public hidden: EventEmitter<this> = new EventEmitter<this>();

  @ViewChild(TemplatePortalDirective, { static : false })
  public contentTemplate: TemplatePortalDirective;

  private overlayRef: OverlayRef;

  private viewRef: EmbeddedViewRef<any>;

  public showing = false;

  constructor(protected injector: Injector,
              protected overlay: Overlay,
              @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }

  public show() {
    if (!this.overlayRef) {
      const overlayConfig = this.getOverlayConfig();
      this.cssClasses && (overlayConfig.panelClass = this.cssClasses);
      this.overlayRef = this.overlay.create(overlayConfig);
      this.overlayRef.backdropClick().subscribe(() => this.hide());
    }

    this.viewRef = this.overlayRef.attach(this.contentTemplate);
    this.setWidth();
    this.showing = true;
    this.visible.emit(this);
  }

  public hide() {
    this.viewRef && this.viewRef.destroy();
    this.overlayRef.detach();
    this.viewRef = null;
    this.showing = false;
    this.hidden.emit(this);
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.setWidth();
  }

  public getOverlayRef(): OverlayRef {
    return this.overlayRef;
  }

  public ngOnDestroy() {
    this.overlayRef && this.overlayRef.dispose();
    this.overlayRef = null;
  }

  private setWidth() {
    if (!this.overlayRef || !this.syncWidth) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    let width = refRect.width;

    if (width < this.minWidth) {
      width = this.minWidth;
    }

    if (width > this.maxWidth) {
      width = this.maxWidth;
    }

    this.overlayRef.updateSize({ width });
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
      }]);

    const scrollStrategy = this.overlay.scrollStrategies.block();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }
}
