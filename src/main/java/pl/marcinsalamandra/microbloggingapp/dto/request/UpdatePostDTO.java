package pl.marcinsalamandra.microbloggingapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UpdatePostDTO {
    private String content;
    private Boolean hasPicture;
}
