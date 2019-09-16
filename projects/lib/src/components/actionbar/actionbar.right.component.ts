import { Component, forwardRef, Injector, Optional, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';

@Component({
  selector: 'lego-actionbar-right',
  template: '<ng-content></ng-content>',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ActionbarRightComponent) },
    { provide: Child, useExisting: forwardRef(() => ActionbarRightComponent) }
  ]
})
export class ActionbarRightComponent extends LegoBaseComponent {

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
