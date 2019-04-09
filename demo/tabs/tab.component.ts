import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'demo-tab',
  template: `<div class="tab-content">
               <ng-content></ng-content>
             </div>`,
  styleUrls: ['_tab.scss']
})
export class TabComponent {

  @Input()
  public active: boolean;

  @Input('heading')
  public heading: string;

  @HostBinding('style.display')
  public get isActive() {
    return this.active ? 'block' : 'none';
  }
}
