import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/module';

@NgModule({
  imports: [
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class LegoModule {}
