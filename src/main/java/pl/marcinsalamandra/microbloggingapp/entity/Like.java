package pl.marcinsalamandra.microbloggingapp.entity;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            nullable = false,
            unique = true)
    private Long id;

    @NonNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "liked_by_id",
            nullable = false,
            referencedColumnName = "id")
    private AppUser likedBy;

    @NonNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "liked_post_id",
            nullable = false,
            referencedColumnName = "id")
    private Post likedPost;

    @NonNull
    @Column(name = "key", unique = true)
    private String key;
}
