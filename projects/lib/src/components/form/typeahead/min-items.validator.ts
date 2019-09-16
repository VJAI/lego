import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function minItemsValidator(minItems: number, errMessage: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = control.value && control.value.length >= minItems;
    return isValid ?  null : { 'minItems': errMessage };
  };
}

@Directive({
  selector: '[min-items]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinItemsValidatorDirective, multi: true}]
})
export class MinItemsValidatorDirective implements Validator {

  @Input('min-items')
  public minItems = 1;

  @Input('min-items-err-message')
  public errMessage = 'Please select atleast {minItems} item(s).';

  validate(control: AbstractControl): {[key: string]: any} | null {
    return minItemsValidator(this.minItems, this.errMessage.replace(/{minItems}/, this.minItems.toString()))(control);
  }
}
