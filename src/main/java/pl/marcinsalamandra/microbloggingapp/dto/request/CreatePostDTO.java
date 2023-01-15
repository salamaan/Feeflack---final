package pl.marcinsalamandra.microbloggingapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CreatePostDTO {
    private Long postedById;
    private String content;
}
