package com.elec5619.backend.utils.validators.InputStringValidator;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeValidator implements ConstraintValidator<DateTimeConstraint, String>{



    @Override
    public boolean isValid(String dateTime, ConstraintValidatorContext context) {
        try{
            LocalDateTime localDateTime =  LocalDateTime.parse(dateTime, DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm"));
            System.out.println(localDateTime);

            if(localDateTime==null) {
                return false;
            }
            return true;
        }catch (Exception e){
        }


        return false;

    }
}
