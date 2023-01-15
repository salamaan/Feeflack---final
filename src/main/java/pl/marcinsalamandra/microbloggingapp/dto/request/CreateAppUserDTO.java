package pl.marcinsalamandra.microbloggingapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidEmail;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidPassword;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidUsername;

@AllArgsConstructor
@Getter
@Setter
public class CreateAppUserDTO {
    @ValidUsername
    private String username;

    @ValidEmail
    private String email;

    @ValidPassword
    private String password;
}
