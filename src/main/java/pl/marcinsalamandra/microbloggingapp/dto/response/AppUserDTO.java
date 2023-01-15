package pl.marcinsalamandra.microbloggingapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Setter
public class AppUserDTO {
    private Long id;
    private String username;
    private String description;
    private LocalDate createdAt;
    private Long followersCount;
    private Long followingCount;
    private Boolean isFollowedByIssuer;
    private Boolean hasProfilePicture;
}
