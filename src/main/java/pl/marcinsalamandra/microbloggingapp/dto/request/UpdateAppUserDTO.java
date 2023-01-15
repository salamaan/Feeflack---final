package pl.marcinsalamandra.microbloggingapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidDescription;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidEmail;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidPassword;
import pl.marcinsalamandra.microbloggingapp.annotation.ValidUsername;

@AllArgsConstructor
@Getter
@Setter
public class UpdateAppUserDTO {
    private Boolean hasPicture;
    private String description;
}
