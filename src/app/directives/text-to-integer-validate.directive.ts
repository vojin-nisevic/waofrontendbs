import { Directive, ElementRef, Input} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from "@angular/forms";


@Directive({
  selector: '[appTextToIntegerValidate]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TextToIntegerValidateDirective, multi: true }]
})
export class TextToIntegerValidateDirective implements Validator {

  @Input('minLevel') min: number;
  @Input('maxLevel') max: number;
  @Input('negative') allowNegativeValues: boolean = false;

  constructor(private el: ElementRef) {
  }


  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.dirty) {
      if (+this.onlyNumbers(control.value) < +this.min) {
        return { 'min': true };
      }
      if (+this.onlyNumbers(control.value) > +this.max) {
        return {'max': true}
      }
      return null;
    }
    return null;
  }

  onlyNumbers(val: number): string {
    // console.log('val: ' + val);
    return val.toString().split(',').join('');
  }


}
