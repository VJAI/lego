import { Component } from '@angular/core';
import { LoaderService } from 'lego';

@Component({
  selector: 'demo-loader',
  templateUrl: './loader.html'
})
export class LoaderDemoComponent {

  constructor(private loaderService: LoaderService) {
  }

  public start() {
    this.loaderService.show();
  }

  public stop() {
    this.loaderService.hide();
  }
}
