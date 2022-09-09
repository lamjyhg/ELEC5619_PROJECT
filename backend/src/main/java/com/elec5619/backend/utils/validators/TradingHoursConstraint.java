package com.elec5619.backend.utils.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = TradingHoursValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface TradingHoursConstraint {
    String message() default " ";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
