package pl.marcinsalamandra.microbloggingapp.annotation.validator;


import pl.marcinsalamandra.microbloggingapp.annotation.ValidPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    public static final String PASSWORD_PATTERN = "[a-zA-Z\\d]{8,20}";

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context){
        return Pattern.compile(PASSWORD_PATTERN)
                .matcher(password)
                .matches();
    }
}
