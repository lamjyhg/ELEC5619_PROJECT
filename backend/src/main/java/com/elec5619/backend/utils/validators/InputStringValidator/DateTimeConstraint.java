package com.elec5619.backend.utils.validators.InputStringValidator;



import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DateTimeValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DateTimeConstraint {
    String message() default "date time should be valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
