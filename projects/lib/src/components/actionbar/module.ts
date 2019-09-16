import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionbarComponent } from './actionbar.component';
import { ActionbarLeftComponent } from './actionbar.left.component';
import { ActionbarRightComponent } from './actionbar.right.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionbarComponent,
    ActionbarLeftComponent,
    ActionbarRightComponent
  ],
  exports: [
    ActionbarComponent,
    ActionbarLeftComponent,
    ActionbarRightComponent
  ]
})
export class ActionbarModule {
}
