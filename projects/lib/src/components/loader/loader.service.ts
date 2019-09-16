import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private ngxLoadingService: LoadingBarService) {
  }

  show() {
    this.ngxLoadingService.start();
  }

  hide() {
    this.ngxLoadingService.stop();
  }
}
