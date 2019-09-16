import { Component, forwardRef, Injector, Input, Optional, SkipSelf } from '@angular/core';
import { Util } from '../../util/index';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';

@Component({
  selector: 'lego-appbar',
  templateUrl: './appbar.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => AppBarComponent) },
    { provide: Child, useExisting: forwardRef(() => AppBarComponent) }
  ]
})
export class AppBarComponent extends LegoBaseComponent {

  @Input()
  public logo: string;

  private _logoWidth = '6.25rem';

  public get logoWidth() {
    return this._logoWidth;
  }

  @Input('logo-width')
  public set logoWidth(value: string | number) {
    this._logoWidth = Util.isNumeric(value) ? `${value}px` : <string>value;
  }

  @Input('home-url')
  public homeUrl: string;

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }
}
