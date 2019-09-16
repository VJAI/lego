import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'demo-select',
  templateUrl: './select.html'
})
export class SelectDemoComponent {

  public selectedGender: string;

  public selectedSnack: string;

  public selectedCity = '2';

  @ViewChild('message', { static : false })
  public message: ElementRef;

  public onChangeHandler() {
    this.message.nativeElement.innerHTML += 'Changed!<br>';
  }
}
