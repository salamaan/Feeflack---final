package pl.marcinsalamandra.microbloggingapp.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import pl.marcinsalamandra.microbloggingapp.dto.response.AppUserDTO;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;
import pl.marcinsalamandra.microbloggingapp.repository.AppUserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppUserConverter {

    private static AppUserRepository appUserRepository;

    @Autowired
    public AppUserConverter(AppUserRepository appUserRepository) {
        AppUserConverter.appUserRepository = appUserRepository;
    }

    public static AppUserDTO convert(AppUser user, Boolean isFollowedByIssuer) {
        return new AppUserDTO(
                user.getId(),
                user.getUsername(),
                user.getDescription(),
                user.getCreatedAt(),
                user.getFollowersCount(),
                user.getFollowingCount(),
                isFollowedByIssuer,
                user.getHasProfilePicture()
        );
    }

    public static AppUserDTO toResponse(AppUser user, Long issuerId) {
        Long userId = user.getId();

        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, List.of(userId));

        return convert(user, idsOfUsersFollowedByIssuer.contains(userId));
    }

    public static Page<AppUserDTO> toResponsePage(Page<AppUser> users, Long issuerId) {
        List<Long> ids = users.getContent()
                .stream()
                .map(AppUser::getId)
                .collect(Collectors.toList());

        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, ids);

        return users.map(user -> convert(user, idsOfUsersFollowedByIssuer.contains(user.getId())));
    }
}
