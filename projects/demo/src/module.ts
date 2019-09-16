import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonGroupDemoComponent } from './button-group/button-group-demo.component';
import { ChipsDemoComponent } from './chips/chips-demo.component';
import { CustomDialogDemoComponent } from './dialog/custom-dialog-demo.component';
import { DialogDemoComponent } from './dialog/dialog-demo.component';
import { EditorDemoComponent } from './editor/editor-demo.component';
import { LoaderDemoComponent } from './loader/loader-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';
import { DemoRoutingModule } from './routing';
import { LegoModule } from 'lego';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { DemoNavbarComponent } from './demo-navbar.component';
import { IntroComponent } from './intro/intro-component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SliderDemoComponent } from './slider/slider-demo.component';
import { SpinnerDemoComponent } from './spinner/spinner-demo.component';
import { ToastDemoComponent } from './toast/toast-demo.component';
import { TooltipDemoComponent } from './tooltip/tooltip-demo.component';
import { CustomTypeaheadOptionComponent, TypeaheadDemoComponent } from './typeahead/typeahead-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { AppbarDemoComponent } from './appbar/appbar-demo.component';
import { CardDemoComponent, CardDemoContentComponent } from './card/card-demo.component';
import { CardListDemoComponent } from './card/card-list-demo.component';
import { TabsDemoComponent, TabsDemoContainerComponent } from './tabs/tabs-demo.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { IconDemoComponent } from './icon/icon-demo.component';
import { TextDemoComponent } from './text/text-demo.component';
import { DemoStickyDirective } from './demo-sticky.directive';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { SwitchDemoComponent } from './switch/switch-demo.component';
import { WidgetDemoComponent } from './widget/widget-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DemoRoutingModule,
    LegoModule
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    DemoNavbarComponent,
    IntroComponent,
    ButtonDemoComponent,
    TypographyDemoComponent,
    ColorDemoComponent,
    AppbarDemoComponent,
    CardDemoComponent,
    CardDemoContentComponent,
    CardListDemoComponent,
    TabsDemoComponent,
    TabsDemoContainerComponent,
    TabsComponent,
    TabComponent,
    IconDemoComponent,
    TextDemoComponent,
    DemoStickyDirective,
    CheckboxDemoComponent,
    SwitchDemoComponent,
    SelectDemoComponent,
    TypeaheadDemoComponent,
    ChipsDemoComponent,
    SpinnerDemoComponent,
    CustomTypeaheadOptionComponent,
    TooltipDemoComponent,
    PopoverDemoComponent,
    ToastDemoComponent,
    DialogDemoComponent,
    CustomDialogDemoComponent,
    EditorDemoComponent,
    ButtonGroupDemoComponent,
    SliderDemoComponent,
    LoaderDemoComponent,
    WidgetDemoComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    IntroComponent,
    ButtonDemoComponent,
    TypographyDemoComponent,
    ColorDemoComponent,
    AppbarDemoComponent,
    CardDemoComponent,
    TabsDemoComponent,
    IconDemoComponent,
    TextDemoComponent,
    CheckboxDemoComponent,
    SwitchDemoComponent,
    SelectDemoComponent,
    TypeaheadDemoComponent,
    ChipsDemoComponent,
    SpinnerDemoComponent,
    CustomTypeaheadOptionComponent,
    TooltipDemoComponent,
    PopoverDemoComponent,
    ToastDemoComponent,
    DialogDemoComponent,
    CustomDialogDemoComponent,
    EditorDemoComponent,
    ButtonGroupDemoComponent,
    SliderDemoComponent,
    LoaderDemoComponent,
    WidgetDemoComponent
  ]
})
export class AppModule {}
