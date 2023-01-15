package pl.marcinsalamandra.microbloggingapp.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import pl.marcinsalamandra.microbloggingapp.dto.response.CommentDTO;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;
import pl.marcinsalamandra.microbloggingapp.entity.Comment;
import pl.marcinsalamandra.microbloggingapp.repository.AppUserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentConverter {

    private static AppUserRepository appUserRepository;

    @Autowired
    public CommentConverter(AppUserRepository appUserRepository) {
        CommentConverter.appUserRepository = appUserRepository;
    }

    public static CommentDTO convert(Comment comment, Boolean isFollowedByIssuer) {
        return new CommentDTO(
                comment.getId(),
                AppUserConverter.convert(comment.getCommentedBy(), isFollowedByIssuer),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getCommentedPost().getId()
        );
    }

    public static CommentDTO toResponse(Comment comment, Long issuerId) {
        Long commentedById = comment.getCommentedBy().getId();

        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, List.of(commentedById));

        return convert(comment, idsOfUsersFollowedByIssuer.contains(commentedById));
    }

    public static Page<CommentDTO> toResponsePage(Page<Comment> comments, Long issuerId) {
        List<Long> ids = comments.getContent()
                .stream()
                .map(Comment::getCommentedBy)
                .map(AppUser::getId)
                .collect(Collectors.toList());

        List<Long> idsOfUsersFollowedByIssuer = appUserRepository.getIdsOfUsersFollowedByIssuer(issuerId, ids);

        return comments.map(comment -> convert(comment, idsOfUsersFollowedByIssuer.contains(comment.getCommentedBy().getId())));
    }
}
