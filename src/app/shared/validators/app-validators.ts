import { Validators as NGValidators, AbstractControl } from '@angular/forms';

export class Validators extends NGValidators {
  static minLength(length): any {
    return (control: any) =>
      super.minLength(length)(control)
        ? { minLength: 'ველის სიგრძე არ შეიძლება იყოს ' + length + '-ზე ნაკლები' }
        : undefined;
  }

  static maxLength(length): any {
    return (control) =>
      super.maxLength(length)(control)
        ? { maxLength: 'ველის სიგრძე არ შეიძლება იყოს ' + length + '-ზე მეტი' }
        : undefined;
  }

  static required(control): any {
    return super.required(control)
      ? { required: 'ველი აუცილებელია' }
      : undefined;
  }

  static pattern(pattern: string | RegExp, patternDescription?: string): any {
    return (control: AbstractControl) => {
      if (super.pattern(pattern)(control)) {
        return {
          minLength: `გთხოვთ დაიცვათ შაბლონი '${patternDescription || pattern.toString()}'`
        };
      }
    };
  }

  static email(control: AbstractControl) {
    return super.email(control) ? { required: 'გთხოვთ შეიყვანოთ სწორი email' } : undefined;
  };
}
