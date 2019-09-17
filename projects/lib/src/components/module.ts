import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/index';
import { AppBarModule } from './appbar/index';
import { FormModule } from './form/index';
import { CardModule } from './card/index';
import { TabsModule } from './tabs/module';
import { ActionbarModule } from './actionbar/index';
import { PopupModule } from './popup/index';
import { IconModule } from './icon/index';
import { ChipsModule } from './chips/index';
import { SpinnerModule } from './spinner/index';
import { WidgetModule } from './widget/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    AppBarModule,
    FormModule,
    CardModule,
    TabsModule,
    ActionbarModule,
    PopupModule,
    IconModule,
    ChipsModule,
    SpinnerModule,
    WidgetModule
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
    SpinnerModule,
    WidgetModule
  ]
})
export class ComponentsModule {
}
