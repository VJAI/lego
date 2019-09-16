import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/index';
import { CardComponent } from './card.component';
import { CardListComponent } from './card.list.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    CardComponent,
    CardListComponent
  ],
  exports: [
    CardComponent,
    CardListComponent
  ]
})
export class CardModule {
}
