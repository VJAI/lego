import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/index';
import { FormModule } from './form/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    FormModule
  ],
  exports: [
    ButtonModule,
    FormModule
  ]
})
export class ComponentsModule {
}
