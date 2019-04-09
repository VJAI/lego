import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/index';
import { ChipComponent } from './chip.component';
import { ChipsComponent } from './chips.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    ChipsComponent,
    ChipComponent
  ],
  exports: [
    ChipsComponent,
    ChipComponent
  ]
})
export class ChipsModule {
}
