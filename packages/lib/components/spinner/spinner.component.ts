import { Component } from '@angular/core';
import { LegoBaseComponent } from '../lego-base.component';

@Component({
  selector: 'lego-spinner',
  template: `<svg fill="#000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                  width="50" height="50" viewBox="0 0 50 50">
    <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,
18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" />
  </svg>`,
})
export class SpinnerComponent extends LegoBaseComponent {
}
