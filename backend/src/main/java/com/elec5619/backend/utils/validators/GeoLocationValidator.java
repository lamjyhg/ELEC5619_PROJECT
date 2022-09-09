package com.elec5619.backend.utils.validators;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.*;
import java.util.Map;

public class GeoLocationValidator implements
        ConstraintValidator<GeoLocationConstraint, Map<String, Double>> {

    @Override
    public boolean isValid(Map<String, Double> value, ConstraintValidatorContext context) {
        return value.size() == 2 && value.containsKey("lat") && value.containsKey("lng");
    }

}

