package pl.marcinsalamandra.microbloggingapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class CommentDTO {
    private Long id;
    private AppUserDTO commentedBy;
    private String content;
    private LocalDateTime createdAt;
    private Long commentedPostId;
}
