import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/index';
import { PopupModule } from '../popup/index';
import { IconModule } from '../icon/index';
import { ChipsModule } from '../chips/index';
import { SpinnerModule } from '../spinner/index';
import { ButtonGroupOptionComponent } from './button-group/button-group-option.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select/select-option.component';
import { MaxItemsValidatorDirective } from './typeahead/max-items.validator';
import { MinItemsValidatorDirective } from './typeahead/min-items.validator';
import { TypeaheadOptionsContainerComponent } from './typeahead/typeahead-options-container.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { TypeaheadOptionComponent } from './typeahead/typeahead-option.component';
import { ErrorComponent } from './error/error.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radiobutton/radiobutton.component';
import { RadioButtonOptionComponent } from './radiobutton/radiobutton-option.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule,
    IconModule,
    ChipsModule,
    SpinnerModule
  ],
  declarations: [
    TextboxComponent,
    TextAreaComponent,
    SelectComponent,
    SelectOptionComponent,
    TypeaheadComponent,
    TypeaheadOptionComponent,
    TypeaheadOptionsContainerComponent,
    ErrorComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonOptionComponent,
    SwitchComponent,
    ButtonGroupComponent,
    ButtonGroupOptionComponent,
    MinItemsValidatorDirective,
    MaxItemsValidatorDirective
  ],
  exports: [
    TextboxComponent,
    TextAreaComponent,
    SelectComponent,
    SelectOptionComponent,
    TypeaheadComponent,
    TypeaheadOptionComponent,
    ErrorComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonOptionComponent,
    SwitchComponent,
    ButtonGroupComponent,
    ButtonGroupOptionComponent,
    MinItemsValidatorDirective,
    MaxItemsValidatorDirective
  ]
})
export class FormModule {
}
