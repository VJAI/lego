import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WidgetComponent
  ],
  exports: [
    WidgetComponent
  ]
})
export class WidgetModule {
}
