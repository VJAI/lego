import { AfterContentInit, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

export enum TabsAlignment {
  Left = 'left',
  Right = 'right',
  Center = 'center'
}

@Component({
  selector: 'lego-tabs',
  templateUrl: './tabs.html'
})
export class TabsComponent implements AfterContentInit {

  @Input('tabs-align')
  public align = TabsAlignment.Left;

  public get tabsAlignment(): string {
    if (this.align === TabsAlignment.Left) {
      return 'flex-start';
    } else if (this.align === TabsAlignment.Right) {
      return 'flex-end';
    } else {
      return 'center';
    }
  }

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
