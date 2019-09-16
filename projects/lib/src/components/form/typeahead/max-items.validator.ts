import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function maxItemsValidator(maxItems: number, errMessage: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = !control.value || control.value.length <= maxItems;
    return isValid ?  null : { 'maxItems': errMessage };
  };
}

@Directive({
  selector: '[max-items]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxItemsValidatorDirective, multi: true}]
})
export class MaxItemsValidatorDirective implements Validator {

  @Input('max-items')
  public maxItems = 1;

  @Input('max-items-err-message')
  public errMessage = 'You can\'t select more than {maxItems} item(s).';

  validate(control: AbstractControl): {[key: string]: any} | null {
    return maxItemsValidator(this.maxItems, this.errMessage.replace(/{maxItems}/, this.maxItems.toString()))(control);
  }
}
