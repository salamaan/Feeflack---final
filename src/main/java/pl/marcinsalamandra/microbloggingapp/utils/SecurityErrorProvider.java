package pl.marcinsalamandra.microbloggingapp.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class SecurityErrorProvider {

    public static void sendResponseWithError(HttpServletResponse response, String message) throws IOException {
        response.setHeader("error", message);
        response.setStatus(FORBIDDEN.value());

        Map<String, String> error = Map.of(
                "httpStatus", FORBIDDEN.name(),
                "message", message
        );

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}
