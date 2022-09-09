package com.elec5619.backend.utils.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Map;

public class TradingHoursValidator implements
        ConstraintValidator<TradingHoursConstraint, Map<String, Map<String, String>> > {


    @Override
    public boolean isValid(Map<String, Map<String, String>> value, ConstraintValidatorContext context) {
        return true;
    }
}