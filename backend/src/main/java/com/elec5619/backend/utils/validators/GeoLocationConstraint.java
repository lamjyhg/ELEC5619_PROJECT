package com.elec5619.backend.utils.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = GeoLocationValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface GeoLocationConstraint {
    String message() default "geoLocation should only contain two columns lat and lng with double value ";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
