package pl.marcinsalamandra.microbloggingapp.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class ApiExceptionBody {
    private HttpStatus httpStatus;
    private String message;
}
