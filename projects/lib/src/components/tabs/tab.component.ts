import { Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lego-tab',
  templateUrl: './tab.html'
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

  @ContentChild(TemplateRef, { static : false })
  public contentTemplate: TemplateRef<any>;

  private _selected = false;

  public get selected() {
    return this._selected;
  }
}
