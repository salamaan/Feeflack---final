package pl.marcinsalamandra.microbloggingapp.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import pl.marcinsalamandra.microbloggingapp.dto.response.PostDTO;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;
import pl.marcinsalamandra.microbloggingapp.entity.Post;
import pl.marcinsalamandra.microbloggingapp.repository.AppUserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostConverter {

    private static AppUserRepository appUserRepository;

    @Autowired
    public PostConverter(AppUserRepository appUserRepository) {
        PostConverter.appUserRepository = appUserRepository;
    }

    public static PostDTO convert(Post post, Boolean isLikedByIssuer, Boolean isFollowedByIssuer) {
        return new PostDTO(
                post.getId(),
                post.getContent(),
                post.getCreatedAt(),
                AppUserConverter.convert(post.getPostedBy(), isFollowedByIssuer),
                post.getCommentsCount(),
                post.getLikesCount(),
                isLikedByIssuer,
                post.getHasPicture()
        );
    }

    public static PostDTO toResponse(Post post, Long issuerId) {
        Long postedById = post.getPostedBy().getId();
        Long postId = post.getId();

        List<Long> idsOfPostsLikedByIssuer = appUserRepository.getIdsOfPostsLikedByIssuer(issuerId, List.of(postId));
        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, List.of(postedById));

        return convert(post, idsOfPostsLikedByIssuer.contains(postId), idsOfUsersFollowedByIssuer.contains(postedById));
    }

    public static Page<PostDTO> toResponsePage(Page<Post> posts, Long issuerId) {
        List<Long> postIds = posts.getContent()
                .stream()
                .map(Post::getId)
                .collect(Collectors.toList());

        List<Long> userIds = posts.getContent()
                .stream()
                .map(Post::getPostedBy)
                .map(AppUser::getId)
                .collect(Collectors.toList());

        List<Long> idsOfPostsLikedByIssuer = appUserRepository.getIdsOfPostsLikedByIssuer(issuerId, postIds);
        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, userIds);

        return posts.map(post -> convert(
                post,
                idsOfPostsLikedByIssuer.contains(post.getId()),
                idsOfUsersFollowedByIssuer.contains(post.getPostedBy().getId())
        ));
    }
}
