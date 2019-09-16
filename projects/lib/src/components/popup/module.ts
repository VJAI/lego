import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionbarModule } from '../actionbar/index';
import { ButtonModule } from '../button/index';
import { IconModule } from '../icon/index';
import { AlertDialogComponent } from './dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';
import { DialogBodyComponent } from './dialog/dialog-body.component';
import { DialogFooterComponent } from './dialog/dialog-footer.component';
import { DialogHeaderComponent } from './dialog/dialog-header.component';
import { DialogComponent } from './dialog/dialog.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PopoverBodyComponent } from './popover/popover-body.component';
import { PopoverTitleComponent } from './popover/popover-title.component';
import { PopoverComponent } from './popover/popover.component';
import { ToastComponent } from './toast/toast.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    IconModule,
    ButtonModule,
    ActionbarModule,
    BrowserAnimationsModule
  ],
  declarations: [
    DropdownComponent,
    TooltipComponent,
    TooltipDirective,
    PopoverComponent,
    PopoverTitleComponent,
    PopoverBodyComponent,
    ToastComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    AlertDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    DropdownComponent,
    TooltipDirective,
    PopoverComponent,
    PopoverTitleComponent,
    PopoverBodyComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ],
  entryComponents: [
    TooltipComponent,
    PopoverComponent,
    PopoverTitleComponent,
    PopoverBodyComponent,
    ToastComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    AlertDialogComponent,
    ConfirmDialogComponent
  ]
})
export class PopupModule {
}
