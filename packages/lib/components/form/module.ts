import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '../popup/index';
import { IconModule } from '../icon/index';
import { ChipsModule } from '../chips/index';
import { SpinnerModule } from '../spinner/index';
import { TextboxComponent } from './textbox/textbox.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select/select-option.component';
import { TypeaheadOptionsContainerComponent } from './typeahead/typeahead-options-container.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { TypeaheadOptionComponent } from './typeahead/typeahead-option.component';
import { EditorComponent } from './editor/editor.component';
import { FormComponent } from './form.component';
import { ErrorComponent } from './error/error.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radiobutton/radiobutton.component';
import { RadioButtonOptionComponent } from './radiobutton/radiobutton-option.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule,
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
    EditorComponent,
    FormComponent,
    ErrorComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonOptionComponent,
    SwitchComponent
  ],
  exports: [
    TextboxComponent,
    TextAreaComponent,
    SelectComponent,
    SelectOptionComponent,
    TypeaheadComponent,
    TypeaheadOptionComponent,
    EditorComponent,
    FormComponent,
    ErrorComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonOptionComponent,
    SwitchComponent
  ]
})
export class FormModule {
}
