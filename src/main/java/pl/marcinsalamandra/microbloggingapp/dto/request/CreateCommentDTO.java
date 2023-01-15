package pl.marcinsalamandra.microbloggingapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CreateCommentDTO {
    private Long commentedById;
    private Long commentedPostId;
    private String content;
}
