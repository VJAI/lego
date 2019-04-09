import { Component, Input } from '@angular/core';
import { LegoBaseComponent } from '../lego-base.component';
import { IconSize } from './icon.size';

@Component({
  selector: 'lego-icon',
  templateUrl: './icon.html'
})
export class IconComponent extends LegoBaseComponent {

  @Input()
  public icon: string;

  @Input()
  public size: IconSize;

  public get faIcon() {
    return ['far', this.icon];
  }
}
