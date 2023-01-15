package pl.marcinsalamandra.microbloggingapp.annotation;

import pl.marcinsalamandra.microbloggingapp.annotation.validator.DescriptionValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = DescriptionValidator.class)
@Documented
public @interface ValidDescription {
    String message() default "Invalid description";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
