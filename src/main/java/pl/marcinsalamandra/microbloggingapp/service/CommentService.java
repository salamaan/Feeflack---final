package pl.marcinsalamandra.microbloggingapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreateCommentDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdateCommentDTO;
import pl.marcinsalamandra.microbloggingapp.entity.Comment;
import pl.marcinsalamandra.microbloggingapp.exception.NotFoundException;
import pl.marcinsalamandra.microbloggingapp.repository.CommentRepository;

import static java.time.LocalDateTime.now;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final AppUserService appUserService;
    private final PostService postService;

    public void checkIfCommentExists(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new NotFoundException("Comment with id: " + commentId + " not found");
        }
    }

    public Comment getComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment with id: " + commentId + " not found"));
    }

    public Comment createComment(CreateCommentDTO request) {
        return commentRepository.save(
                new Comment(
                        appUserService.getUser(request.getCommentedById()),
                        postService.getPost(request.getCommentedPostId()),
                        request.getContent(),
                        now()
                )
        );
    }

    public void deleteComment(Long commentId) {
        checkIfCommentExists(commentId);

        commentRepository.deleteCommentById(commentId);
    }

    public void updateComment(Long commentId, UpdateCommentDTO request) {
        Comment comment = getComment(commentId);
        comment.setContent(request.getContent());

        commentRepository.save(comment);
    }
}
