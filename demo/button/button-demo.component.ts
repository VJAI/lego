import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'demo-btn',
  templateUrl: './button.html'
})
export class ButtonDemoComponent {

  @ViewChild('message1')
  public messageSpan: ElementRef;

  public verifyAccount() {
    this.messageSpan.nativeElement.innerText = 'Your account is verified.';
  }
}
