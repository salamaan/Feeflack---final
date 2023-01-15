package pl.marcinsalamandra.microbloggingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.marcinsalamandra.microbloggingapp.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Boolean existsByKey(String key);

    @Modifying
    @Query("DELETE FROM Like l " +
            "WHERE l.likedPost.id = ?1")
    void deleteLikesByPostId(Long postId);

    @Modifying
    @Query("DELETE FROM Like l " +
            "WHERE l.likedBy.id = ?1 " +
            "OR l.likedPost.id IN(SELECT p.id FROM Post p WHERE p.postedBy.id = ?1)")
    void deleteLikesByUserId(Long userId);

    @Modifying
    @Query(nativeQuery = true,
            value = "INSERT INTO likes " +
                    "(liked_by_id, liked_post_id, key) " +
                    "VALUES(?1, ?2, ?3)")
    void likePost(Long likedById, Long postId, String key);

    @Modifying
    @Query("DELETE FROM Like l " +
            "WHERE l.key = ?1")
    void unlikePost(String key);
}
