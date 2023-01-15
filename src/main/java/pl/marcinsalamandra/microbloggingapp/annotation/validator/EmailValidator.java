package pl.marcinsalamandra.microbloggingapp.annotation.validator;

import pl.marcinsalamandra.microbloggingapp.annotation.ValidEmail;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

    private static final String EMAIL_PATTERN = "^(?=.{1,64}@)[A-Za-z\\d_-]+(\\.[A-Za-z\\d_-]+)*@"
            + "[^-][A-Za-z\\d-]+(\\.[A-Za-z\\d-]+)*(\\.[A-Za-z]{2,})$";

    @Override
    public void initialize(ValidEmail constraintAnnotation) {
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context){
        return Pattern.compile(EMAIL_PATTERN)
                .matcher(email)
                .matches();
    }
}
