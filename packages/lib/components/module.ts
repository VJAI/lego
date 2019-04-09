import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/index';
import { AppBarModule } from './appbar/index';
import { FormModule } from './form/index';
import { CardModule } from './card/index';
import { TabsModule } from './tabs/module';
import { ActionbarModule } from './actionbar/module';
import { PopupModule } from './popup/index';
import { IconModule } from './icon/index';
import { ChipsModule } from './chips/module';
import { SpinnerModule } from './spinner/module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    AppBarModule,
    FormModule,
    CardModule,
    TabsModule,
    ActionbarModule,
    PopupModule,
    IconModule,
    ChipsModule,
    SpinnerModule
  ],
  exports: [
    ButtonModule,
    AppBarModule,
    FormModule,
    CardModule,
    TabsModule,
    ActionbarModule,
    PopupModule,
    IconModule,
    ChipsModule,
    SpinnerModule
  ]
})
export class ComponentsModule {
}
