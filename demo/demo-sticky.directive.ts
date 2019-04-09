import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[demo-sticky]'
})
export class DemoStickyDirective implements AfterViewInit, OnDestroy {

  @HostBinding('class.sticky')
  public isSticky = false;

  private scrollingParent: HTMLDivElement;

  private container: HTMLDivElement;

  private initialOffset: number;

  constructor(private el: ElementRef) {
    this.onViewChange = this.onViewChange.bind(this);
  }

  public ngAfterViewInit() {
    this.scrollingParent = document.querySelector('.demo-main');
    this.container = document.querySelector('.topic-sidenav');
    this.scrollingParent.addEventListener('scroll', this.onViewChange);
    const navHeight = document.querySelector('lego-appbar').getBoundingClientRect().height;
    this.initialOffset = this.el.nativeElement.offsetTop - navHeight - 30;
    this.setSticky();
  }

  public ngOnDestroy() {
    this.scrollingParent.removeEventListener('scroll', this.onViewChange);
  }

  @HostListener('window:resize')
  public onViewChange() {
    this.setSticky();
  }

  private setSticky() {
    this.isSticky = this.scrollingParent.scrollTop >= this.initialOffset;

    if (this.isSticky) {
      const containerWidth = this.container.getBoundingClientRect();
      const el = this.el.nativeElement;
      el.style.setProperty('left', `${containerWidth.left}px`);
      el.style.setProperty('width', `${containerWidth.width}px`);
    }
  }
}
