import { Component, forwardRef, Injector, Optional, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';

@Component({
  selector: 'lego-actionbar',
  templateUrl: './actionbar.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ActionbarComponent) },
    { provide: Child, useExisting: forwardRef(() => ActionbarComponent) }
  ]
})
export class ActionbarComponent extends LegoBaseComponent {

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
