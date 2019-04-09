import { Component } from '@angular/core';

@Component({
  selector: 'demo-tabs1',
  templateUrl: './tabs.html'
})
export class TabsDemoComponent {
}

@Component({
  selector: 'demo-tabs-container',
  template: '<ng-content></ng-content>',
  styles: [':host { padding: 1rem 1.5rem; }']
})
export class TabsDemoContainerComponent {
}
