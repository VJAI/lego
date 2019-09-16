import { Component } from '@angular/core';

@Component({
  selector: 'demo-card',
  templateUrl: './card.html'
})
export class CardDemoComponent {
}

@Component({
  selector: 'demo-card-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./_demo-card.scss']
})
export class CardDemoContentComponent {
}
