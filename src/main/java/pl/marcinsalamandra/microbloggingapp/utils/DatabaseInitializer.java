package pl.marcinsalamandra.microbloggingapp.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.repository.PictureRepository;

import javax.annotation.PostConstruct;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static pl.marcinsalamandra.microbloggingapp.enums.Role.USER;

@SuppressWarnings("WrapperTypeMayBePrimitive")
@Component
@AllArgsConstructor
public class DatabaseInitializer {

    private final PictureRepository pictureRepository;
    public static final boolean INIT_DATABASE = false;

    public static final Long USERS_NUMBER = 10_000L;
    public static final Long POSTS_PER_USER = 4L;
    public static final Long LIKES_PER_USER = 100L;
    public static final Long COMMENTS_PER_USER = 40L;
    public static final Long FOLLOWS_PER_USER = 50L;

    public static final String SQL_MODULE = "sql/";
    public static final String INSERT_USERS_SQL = SQL_MODULE + "insert_users.sql";
    public static final String INSERT_POSTS_SQL = SQL_MODULE + "insert_posts.sql";
    public static final String INSERT_LIKES_SQL = SQL_MODULE + "insert_likes.sql";
    public static final String INSERT_COMMENTS_SQL = SQL_MODULE + "insert_comments.sql";
    public static final String INSERT_FOLLOWERS_SQL = SQL_MODULE + "insert_followers.sql";

    public static final String PASSWORD = "$2a$10$kqSNpmafZ5tnbitA7hFVe.J/nBoTPxx///4qwZvSyDDuvj/w9bDkq";

    public void addUsers() throws IOException {
        FollowersObject data = addFollowers();
        Map<Long, Long> followersCount = data.getFollowersCount();
        Map<Long, Long> followingCount = data.getFollowingCount();

        BufferedWriter writer = new BufferedWriter(new FileWriter(INSERT_USERS_SQL));

        writer.write("INSERT INTO users (id, created_at, description, email, followers_count, following_count, has_profile_picture, password, role, username) VALUES");
        writer.newLine();

        for (Long userId = 1L; userId <= USERS_NUMBER; ++userId) {
            String values = String.format("(%s, '%s', '%s', '%s', %s, %s, %s, '%s', '%s', '%s')",
                    "nextval('users_id_seq')", LocalDate.now(), "description" + userId, "email" + userId + "@gmail.com", followersCount.get(userId), followingCount.get(userId), false, PASSWORD, USER, "username" + userId);

            writer.write(values);

            if (userId < USERS_NUMBER) {
                writer.write(",");
            } else {
                writer.write(";");
            }

            writer.newLine();
        }
        writer.close();
    }

    public void addPosts() throws IOException {
        Map<Long, Long> likesCount = addLikes();
        Map<Long, Long> commentsCount = addComments();

        BufferedWriter writer = new BufferedWriter(new FileWriter(INSERT_POSTS_SQL));

        writer.write("INSERT INTO posts (id, comments_count, content, created_at, has_picture, likes_count, posted_by_id) VALUES");
        writer.newLine();

        for (Long userId = 1L; userId <= USERS_NUMBER; ++userId) {
            for (Long i = 1L; i <= POSTS_PER_USER; ++i) {
                Long postId = i + (POSTS_PER_USER * (userId - 1));

                String values = String.format("(%s, %s, '%s', '%s', %s, %s, %s)",
                        "nextval('posts_id_seq')", commentsCount.get(postId), "post numer: " + i + " ziomka o id: " + userId, LocalDateTime.now(), false, likesCount.get(postId), userId);

                writer.write(values);

                if (postId < USERS_NUMBER * POSTS_PER_USER) {
                    writer.write(",");
                } else {
                    writer.write(";");
                }

                writer.newLine();
            }
        }
        writer.close();
    }

    public Map<Long, Long> addLikes() throws IOException {
        Map<Long, Long> likesCount = new HashMap<>();
        BufferedWriter writer = new BufferedWriter(new FileWriter(INSERT_LIKES_SQL));

        writer.write("INSERT INTO likes (id, liked_by_id, liked_post_id, key) VALUES");
        writer.newLine();

        for (Long userId = 1L; userId <= USERS_NUMBER; ++userId) {
            List<Long> likedIds = new ArrayList<>();

            for (Long i = 1L; i <= LIKES_PER_USER; ++i) {
                Long likeId = i + (LIKES_PER_USER * (userId - 1));
                Long postId = getRandom(1L, USERS_NUMBER * POSTS_PER_USER + 1);

                if (!likedIds.contains(postId)) {
                    likedIds.add(postId);
                    likesCount.merge(postId, 1L, Long::sum);

                    String key = String.format("%s_%s", userId, postId);

                    String values = String.format("(%s, %s, %s, '%s')",
                            "nextval('likes_id_seq')", userId, postId, key);

                    writer.write(values);

                    if (likeId < USERS_NUMBER * LIKES_PER_USER) {
                        writer.write(",");
                    } else {
                        writer.write(";");
                    }

                    writer.newLine();
                } else {
                    --i;
                }
            }
        }
        writer.close();

        return likesCount;
    }

    public Map<Long, Long> addComments() throws IOException {
        Map<Long, Long> commentsCount = new HashMap<>();
        BufferedWriter writer = new BufferedWriter(new FileWriter(INSERT_COMMENTS_SQL));

        writer.write("INSERT INTO comments (id, content, created_at, commented_by_id, commented_post_id) VALUES");
        writer.newLine();

        for (Long userId = 1L; userId <= USERS_NUMBER; ++userId) {
            List<Long> commentedIds = new ArrayList<>();

            for (Long i = 1L; i <= COMMENTS_PER_USER; ++i) {
                Long commentId = i + (COMMENTS_PER_USER * (userId - 1));
                Long postId = getRandom(1L, USERS_NUMBER * POSTS_PER_USER + 1);

                if (!commentedIds.contains(postId)) {
                    commentedIds.add(postId);
                    commentsCount.merge(postId, 1L, Long::sum);

                    String values = String.format("(%s, '%s', '%s', %s, %s)",
                            "nextval('comments_id_seq')", "komentarz numer: " + i + " ziomka o id: " + userId, LocalDateTime.now(), userId, postId);

                    writer.write(values);

                    if (commentId < USERS_NUMBER * COMMENTS_PER_USER) {
                        writer.write(",");
                    } else {
                        writer.write(";");
                    }

                    writer.newLine();
                } else {
                    --i;
                }
            }
        }
        writer.close();

        return commentsCount;
    }

    public FollowersObject addFollowers() throws IOException {
        Map<Long, Long> followersCount = new HashMap<>();
        Map<Long, Long> followingCount = new HashMap<>();

        BufferedWriter writer = new BufferedWriter(new FileWriter(INSERT_FOLLOWERS_SQL));

        writer.write("INSERT INTO followers (from_user_id, to_user_id) VALUES");
        writer.newLine();

        for (Long fromUserId = 1L; fromUserId <= USERS_NUMBER; ++fromUserId) {
            List<Long> followedIds = new ArrayList<>();
            followedIds.add(fromUserId);

            for (Long i = 1L; i <= FOLLOWS_PER_USER; ++i) {
                Long followId = i + (FOLLOWS_PER_USER * (fromUserId - 1));
                Long toUserId = getRandom(1L, USERS_NUMBER + 1);

                if (!followedIds.contains(toUserId)) {
                    followedIds.add(toUserId);
                    followingCount.merge(fromUserId, 1L, Long::sum);
                    followersCount.merge(toUserId, 1L, Long::sum);

                    String values = String.format("(%s, %s)",
                            fromUserId, toUserId);

                    writer.write(values);

                    if (followId < USERS_NUMBER * FOLLOWS_PER_USER) {
                        writer.write(",");
                    } else {
                        writer.write(";");
                    }

                    writer.newLine();
                } else {
                    --i;
                }
            }
        }
        writer.close();

        return new FollowersObject(followersCount, followingCount);
    }

    private void addDefaultProfilePicture() throws IOException {
        byte[] data = Files.readAllBytes(
                new File("C:\\Users\\salam\\IdeaProjects\\microbloggingApp\\src\\main\\resources\\static\\default_profile_picture.png")
                        .toPath());

        pictureRepository.save(new Picture(
                data,
                "default_profile_picture.png",
                "image/png",
                "default_profile_picture"
        ));
    }

    @SuppressWarnings("SameParameterValue")
    private Long getRandom(Long min, Long max) {
        return min + (long) (Math.random() * (max - min));
    }

    @PostConstruct
    public void init() throws IOException {
        if (INIT_DATABASE) {
            addUsers();
            addPosts();
            addDefaultProfilePicture();
        }
    }

    @AllArgsConstructor
    @Setter
    @Getter
    static class FollowersObject {
        Map<Long, Long> followersCount;
        Map<Long, Long> followingCount;
    }
}
