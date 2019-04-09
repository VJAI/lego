import { Component, forwardRef, Injector, Input, Optional, SkipSelf } from '@angular/core';
import { Child, LegoBaseComponent, Parent } from '../../lego-base.component';

@Component({
  selector: 'lego-error',
  templateUrl: './error.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => ErrorComponent) },
    { provide: Child, useExisting: forwardRef(() => ErrorComponent) }
  ]
})
export class ErrorComponent extends LegoBaseComponent {

  @Input()
  public messages: Array<string>;

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
