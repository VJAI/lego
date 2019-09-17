import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/index';

@NgModule({
  imports: [
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class LegoModule {}
