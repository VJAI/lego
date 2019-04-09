import { Component, forwardRef, Injector, Optional, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';

@Component({
  selector: 'lego-actionbar-left',
  template: '<ng-content></ng-content>',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ActionbarLeftComponent) },
    { provide: Child, useExisting: forwardRef(() => ActionbarLeftComponent) }
  ]
})
export class ActionbarLeftComponent extends LegoBaseComponent {

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
