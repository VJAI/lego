import { Component } from '@angular/core';
import { DialogService, MessageType } from 'lego';
import { CustomDialogDemoComponent } from './custom-dialog-demo.component';

@Component({
  selector: 'demo-dialog',
  templateUrl: './dialog.html'
})
export class DialogDemoComponent {

  constructor(private dialog: DialogService) {
  }

  public openAlert(event: UIEvent) {
    event.preventDefault();
    this.dialog.alert('Success', 'The changes to the post saved successfully!', MessageType.Success);
  }

  public openConfirm(event: UIEvent) {
    event.preventDefault();
    this.dialog.confirm('Confirm Approval', 'Are you sure want to approve this contract?');
  }

  public openCustom(event: UIEvent) {
    event.preventDefault();
    this.dialog.open(CustomDialogDemoComponent);
  }
}
