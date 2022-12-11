import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: '[appValidateSelect]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateSelectDirective, multi: true}]
})
export class ValidateSelectDirective implements Validator{

  constructor(private elRef: ElementRef) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!control.dirty) {
      if (+control.value !== -1) {
        control.setValue(-1);
      }
      return null;
    }
    else {
      if (control.value === '-1') {
        this.elRef.nativeElement.classList.add('is-invalid');
        return {'unselected': true};
      }
      else {
        this.elRef.nativeElement.classList.remove('is-invalid');
        this.elRef.nativeElement.classList.add('is-valid');
        return null;
      }
    }
  }
}
