import { Component, AfterContentInit , ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'demo-tabs',
  template: `<ul class="tabs-head">
                <li [class.active]="i === selectedTabIndex" *ngFor="let tab of tabs; let i = index" (click)="showTab(i)">
                    {{tab.heading}}
                </li>
             </ul>
             <ng-content></ng-content>`,
  styleUrls: ['_tabs.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  public tabs: QueryList<TabComponent>;

  public selectedTabIndex = 0;

  /**
   * Sets first tab as active by default.
   */
  ngAfterContentInit() {
    this.tabs.first.active = true;
  }

  /**
   * Sets the passing tab as active.
   */
  public showTab(tabIndex: number) {
    this.tabs.forEach((tab, index) => {
      tabIndex === index ? tab.active = true : tab.active = false;
    });
    this.selectedTabIndex = tabIndex;
  }
}
