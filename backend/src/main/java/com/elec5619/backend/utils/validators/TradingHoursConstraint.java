package com.elec5619.backend.utils.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = TradingHoursValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface TradingHoursConstraint {
    String message() default "working hours only contains key from 1 to 7 for Monday to Sunday, and inner should contain startTime and endTime and startTime should be before endTime";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
