package pl.marcinsalamandra.microbloggingapp.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

import static java.time.LocalDateTime.*;
import static javax.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            nullable = false,
            unique = true)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "posted_by_id",
            nullable = false,
            referencedColumnName = "id")
    private AppUser postedBy;

    @OneToMany(mappedBy = "commentedPost",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "likedPost",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Like> likes;

    @Column(name = "content",
            nullable = false,
            length = 800)
    private String content;

    @Column(name = "created_at",
            nullable = false,
            updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "comments_count")
    private Long commentsCount;

    @Column(name = "likes_count")
    private Long likesCount;

    @Column(name = "has_picture")
    private Boolean hasPicture;

    public Post(AppUser postedBy, String content) {
        this.id = null;
        this.postedBy = postedBy;
        this.comments = null;
        this.likes = null;
        this.content = content;
        this.createdAt = now();
        this.commentsCount = 0L;
        this.likesCount = 0L;
        this.hasPicture = false;
    }
}
