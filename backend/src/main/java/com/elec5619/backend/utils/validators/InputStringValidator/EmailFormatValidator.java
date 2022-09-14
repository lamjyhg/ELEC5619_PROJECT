package com.elec5619.backend.utils.validators.InputStringValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.Null;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailFormatValidator implements ConstraintValidator<EmailFormatConstraint, String>{


    private static final String REGEX = "^(.+)@(\\S+)$";
    private static final Pattern PATTERN = Pattern.compile(REGEX);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {


        try{
            Matcher matcher = PATTERN.matcher(value);
            return matcher.matches();
        }catch (NullPointerException e){
            System.out.println("null pointer");
        }


        return true;

    }
}
