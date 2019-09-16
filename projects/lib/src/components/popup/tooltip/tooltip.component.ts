import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';
import { TooltipDirective } from './tooltip.directive';

@Component({
  selector: 'lego-tooltip',
  template: '{{text}}'
})
export class TooltipComponent extends LegoBaseComponent {

  @Input()
  public text: string;

  @HostBinding('class.dark')
  @Input()
  public isDark = false;

  @HostBinding('class.display')
  public display = false;

  public connectedDirective: TooltipDirective;

  @Input('mouse-enter')
  public mouseEnterCb: () => void;

  @Input('mouse-leave')
  public mouseLeaveCb: () => void;

  @Input('dispose')
  public disposeCb: () => void;

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.mouseEnterCb && this.mouseEnterCb();
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.mouseLeaveCb && this.mouseLeaveCb();
  }

  public show() {
    this.display =  true;
  }

  public hide() {
    this.display = false;
  }

  public dispose() {
    this.disposeCb && this.disposeCb();
  }
}
