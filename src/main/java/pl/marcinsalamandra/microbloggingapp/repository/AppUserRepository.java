package pl.marcinsalamandra.microbloggingapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    @Query("SELECT u.id " +
            "FROM AppUser u " +
            "WHERE u.username = ?1")
    Long findIssuerId(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsernameAndIdNot(String username, Long id);

    Boolean existsByEmailAndIdNot(String email, Long id);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) > 0 " +
                    "FROM followers f " +
                    "WHERE f.from_user_id = ?1 " +
                    "AND f.to_user_id = ?2")
    Boolean isFollowing(Long fromUserId, Long toUserId);

    Optional<AppUser> findByUsername(String username);

    Page<AppUser> findAllByUsernameContaining(String filter, Pageable pageable);

    @Query("SELECT u " +
            "FROM Post p " +
            "JOIN p.likes l " +
            "JOIN l.likedBy u " +
            "WHERE p.id = ?1")
    Page<AppUser> findPostLikers(Long postId, Pageable pageable);

    @Query("SELECT u " +
            "FROM AppUser u " +
            "ORDER BY u.followersCount DESC")
    Page<AppUser> findMostPopularUsers(Pageable pageable);

    @Query("SELECT f " +
            "FROM AppUser u " +
            "JOIN u.followers f " +
            "WHERE u.id = ?1")
    Page<AppUser> findUserFollowers(Long userId, Pageable pageable);

    @Query("SELECT f " +
            "FROM AppUser u " +
            "JOIN u.following f " +
            "WHERE u.id = ?1")
    Page<AppUser> findUserFollowing(Long userId, Pageable pageable);

    @Modifying
    @Query(nativeQuery = true,
            value = "INSERT INTO followers " +
                    "(from_user_id, to_user_id) " +
                    "VALUES(?1, ?2)")
    void followUser(Long fromUserId, Long toUserId);

    @Modifying
    @Query(nativeQuery = true,
            value = "DELETE FROM followers f " +
                    "WHERE f.from_user_id = ?1 " +
                    "AND f.to_user_id = ?2")
    void unfollowUser(Long fromUserId, Long toUserId);

    @Modifying
    @Query("DELETE FROM AppUser u " +
            "WHERE u.id = ?1")
    void deleteUserById(Long userId);

    @Query("SELECT p.id " +
            "FROM AppUser u " +
            "JOIN u.likes l " +
            "JOIN l.likedPost p " +
            "WHERE u.id = ?1 " +
            "AND p.id IN ?2")
    List<Long> getIdsOfPostsLikedByIssuer(Long issuerId, List<Long> postIds);

    @Query("SELECT f.id " +
            "FROM AppUser u " +
            "JOIN u.following f " +
            "WHERE u.id = ?1 " +
            "AND f.id IN ?2")
    List<Long> getIdsOfUsersFollowedByIssuer(Long issuerId, List<Long> ids);
}
