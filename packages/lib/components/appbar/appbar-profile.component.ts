import { Component, Input } from '@angular/core';

@Component({
  selector: 'lego-appbar-profile',
  templateUrl: 'appbar-profile.html'
})
export class AppbarProfileComponent {

  @Input('profile-img')
  public profileImage: string;
}
