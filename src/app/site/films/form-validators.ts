import { AbstractControl, ValidatorFn } from '@angular/forms';
export class FormValidators {
    static integerBetween(min: number, max: number): ValidatorFn {
        return (c: AbstractControl) => {
            if (!Number.isInteger(c.value)) { //si la valeur n'est pas un entier
                return {
                    integer: {
                        valid: false
                    }
                }
            }
            else if ((c.value < min) || (c.value > max)) { //si la valeur est en dehors des limites
                return {
                    limit: {
                        valid: false
                    }
                };
            }

            return null;
        }
    };
}