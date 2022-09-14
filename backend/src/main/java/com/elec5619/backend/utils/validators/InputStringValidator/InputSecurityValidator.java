package com.elec5619.backend.utils.validators.InputStringValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class InputSecurityValidator implements ConstraintValidator<InputSecurityConstraint, String> {

    // <InputSecurityValidatorConstraint, String> the first parameter is the interface that will extends Annotation,
    // the second parameter id the type of the field that will be validated. For example, the field "password" needs to be
    // validated and its type is String, so the second parameter is String, if there is a int needs to be validated, then the
    // second parameter will be Integer.

    private static final char[] SPECIAL_CHARS = {'%', '\'', '$', '=', '!', '`', ' '};

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if(value == null){
            return false;
        }

        for (char singleChar:SPECIAL_CHARS ) {
            if(value.indexOf(singleChar) >= 0){
                return false;
            }
        }

        return true;
    }
}
