package pl.marcinsalamandra.microbloggingapp.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}


