package pl.marcinsalamandra.microbloggingapp.annotation.validator;

import pl.marcinsalamandra.microbloggingapp.annotation.ValidUsername;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class UsernameValidator implements ConstraintValidator<ValidUsername, String> {

    public static final String USERNAME_PATTERN = "[a-zA-Z\\d]{4,15}";

    @Override
    public void initialize(ValidUsername constraintAnnotation) {
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context){
        return Pattern.compile(USERNAME_PATTERN)
                .matcher(username)
                .matches();
    }
}
