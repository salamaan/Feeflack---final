package pl.marcinsalamandra.microbloggingapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.marcinsalamandra.microbloggingapp.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c " +
            "FROM Post p " +
            "JOIN p.comments c " +
            "WHERE p.id = ?1 " +
            "ORDER BY c.id DESC")
    Page<Comment> findPostComments(Long postId, Pageable pageable);

    @Modifying
    @Query("DELETE FROM Comment c " +
            "WHERE c.commentedPost.id = ?1")
    void deleteCommentsByPostId(Long postId);

    @Modifying
    @Query("DELETE FROM Comment c " +
            "WHERE c.commentedBy.id = ?1 " +
            "OR c.commentedPost.id IN(SELECT p.id FROM Post p WHERE p.postedBy.id = ?1)")
    void deleteCommentsByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Comment c " +
            "WHERE c.id = ?1")
    void deleteCommentById(Long id);
}
