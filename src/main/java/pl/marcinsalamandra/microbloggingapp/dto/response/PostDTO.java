package pl.marcinsalamandra.microbloggingapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class PostDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private AppUserDTO postedBy;
    private Long commentsCount;
    private Long likesCount;
    private Boolean isLikedByIssuer;
    private Boolean hasPicture;
}
