package pl.marcinsalamandra.microbloggingapp.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            nullable = false,
            unique = true)
    private Long id;

    @NonNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "commented_by_id",
            nullable = false,
            referencedColumnName = "id")
    private AppUser commentedBy;

    @NonNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "commented_post_id",
            nullable = false,
            referencedColumnName = "id")
    private Post commentedPost;

    @NonNull
    @Column(name = "content",
            nullable = false,
            length = 400)
    private String content;

    @NonNull
    @Column(name = "created_at",
            nullable = false,
            updatable = false)
    private LocalDateTime createdAt;
}
