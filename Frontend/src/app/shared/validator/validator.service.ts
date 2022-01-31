import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public namePattern: string = '([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string = '[0-9]{6}';
  // public passwordPattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$'

  constructor() { }

  public fieldEquals(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      }
      formGroup.get(campo2)?.setErrors(null);
      return null
    }
  }

}
