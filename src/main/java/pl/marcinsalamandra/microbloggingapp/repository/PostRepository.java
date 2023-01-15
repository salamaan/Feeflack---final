package pl.marcinsalamandra.microbloggingapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.marcinsalamandra.microbloggingapp.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p " +
            "FROM Post p " +
            "ORDER BY p.likesCount DESC")
    Page<Post> findMostPopularPosts(Pageable pageable);

    @Query("SELECT p " +
            "FROM AppUser u " +
            "JOIN u.following f " +
            "JOIN f.posts p " +
            "WHERE u.id = ?1 " +
            "ORDER BY p.id DESC")
    Page<Post> findPostsOfFollowing(Long userId, Pageable pageable);

    @Query("SELECT p " +
            "FROM AppUser u " +
            "JOIN u.posts p " +
            "WHERE u.id = ?1 " +
            "ORDER BY p.id DESC")
    Page<Post> findPostsOfUser(Long userId, Pageable pageable);

    @Modifying
    @Query("DELETE FROM Post p " +
            "WHERE p.id = ?1")
    void deletePostById(Long postId);

    @Modifying
    @Query("DELETE FROM Post p " +
            "WHERE p.postedBy.id = ?1")
    void deletePostsByUserId(Long userId);
}
