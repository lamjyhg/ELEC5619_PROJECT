package com.elec5619.backend.utils.validators.InputStringValidator;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented()
@Constraint(validatedBy = InputSecurityValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface InputSecurityConstraint {


    String message() default "Inputs cannot include special characters. e.g. '%', '\'', '$', '=', '!' '`' and spaces";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
