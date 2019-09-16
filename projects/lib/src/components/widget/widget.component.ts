import { Component, Input } from '@angular/core';
import { LegoBaseComponent } from '../lego-base.component';

@Component({
  selector: 'lego-widget',
  templateUrl: './widget.html'
})
export class WidgetComponent extends LegoBaseComponent {

  @Input()
  public title: string;

  @Input('body-padding')
  public bodyPadding = '0px';
}
