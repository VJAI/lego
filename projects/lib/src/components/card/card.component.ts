import { Component, forwardRef, Injector, Optional, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';

@Component({
  selector: 'lego-card',
  template: `<ng-content></ng-content>`,
  providers: [
    { provide: Parent, useExisting: forwardRef(() => CardComponent) },
    { provide: Child, useExisting: forwardRef(() => CardComponent) }
  ]
})
export class CardComponent extends LegoBaseComponent {

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
