import { Component } from '@angular/core';
import { ToastService } from 'lego';

@Component({
  selector: 'demo-toast',
  templateUrl: './toast.html'
})
export class ToastDemoComponent {

  constructor(private toast: ToastService) {}

  public showSuccess(event: UIEvent) {
    event.preventDefault();
    this.toast.success('Data Saved Successfully!');
  }

  public showError(event: UIEvent) {
    event.preventDefault();
    this.toast.error('Data Failed To Save!');
  }

  public showWarning(event: UIEvent) {
    event.preventDefault();
    this.toast.warning('Please Fix The Warnings!');
  }

  public showInfo(event: UIEvent) {
    event.preventDefault();
    this.toast.info('You\'ve Received Some Messages!');
  }
}
