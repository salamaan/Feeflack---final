package pl.marcinsalamandra.microbloggingapp.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.HttpStatus.*;

@SuppressWarnings("NullableProblems")
@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private ResponseEntity<ApiExceptionBody> handleException(HttpStatus httpStatus, String message) {
        ApiExceptionBody body = new ApiExceptionBody(httpStatus, message);
        return new ResponseEntity<>(body, httpStatus);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiExceptionBody> handleBadRequestException(BadRequestException e) {
        return handleException(BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiExceptionBody> handleNotFoundException(NotFoundException e) {
        return handleException(NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiExceptionBody> handleConflictException(ConflictException e) {
        return handleException(CONFLICT, e.getMessage());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {

        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        ApiExceptionBody body = new ApiExceptionBody(BAD_REQUEST, message);

        return new ResponseEntity<>(body, BAD_REQUEST);
    }
}
