package pl.marcinsalamandra.microbloggingapp.annotation.validator;

import pl.marcinsalamandra.microbloggingapp.annotation.ValidDescription;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DescriptionValidator implements ConstraintValidator<ValidDescription, String> {

    @Override
    public void initialize(ValidDescription constraintAnnotation) {
    }

    @Override
    public boolean isValid(String description, ConstraintValidatorContext context) {
        return description.length() <= 255;
    }
}
