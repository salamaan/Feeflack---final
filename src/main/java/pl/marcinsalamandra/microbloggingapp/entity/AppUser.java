package pl.marcinsalamandra.microbloggingapp.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import pl.marcinsalamandra.microbloggingapp.enums.Role;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

import static java.time.LocalDate.now;
import static javax.persistence.GenerationType.IDENTITY;
import static pl.marcinsalamandra.microbloggingapp.enums.Role.USER;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            nullable = false,
            unique = true)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role",
            nullable = false,
            updatable = false)
    private Role role;

    @Column(name = "username",
            unique = true,
            nullable = false,
            length = 15)
    private String username;

    @Column(name = "email",
            unique = true,
            nullable = false,
            length = 64)
    private String email;

    @Column(name = "password",
            nullable = false)
    private String password;

    @Column(name = "description",
            nullable = false,
            length = 800)
    private String description;

    @Column(name = "created_at",
            nullable = false,
            updatable = false)
    private LocalDate createdAt;

    @ManyToMany
    @LazyCollection(LazyCollectionOption.EXTRA)
    @JoinTable(name = "followers",
            joinColumns = {@JoinColumn(name = "to_user_id")},
            inverseJoinColumns = {@JoinColumn(name = "from_user_id")})
    private Set<AppUser> followers;

    @ManyToMany
    @LazyCollection(LazyCollectionOption.EXTRA)
    @JoinTable(name = "followers",
            joinColumns = {@JoinColumn(name = "from_user_id")},
            inverseJoinColumns = {@JoinColumn(name = "to_user_id")})
    private Set<AppUser> following;

    @OneToMany(mappedBy = "postedBy",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Post> posts;

    @OneToMany(mappedBy = "commentedBy",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "likedBy",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Like> likes;

    @Column(name = "followers_count")
    private Long followersCount;

    @Column(name = "following_count")
    private Long followingCount;

    @Column(name = "has_profile_picture")
    private Boolean hasProfilePicture;

    public AppUser(String username, String email, String password) {
        this.id = null;
        this.role = USER;
        this.username = username;
        this.email = email;
        this.password = password;
        this.description = "";
        this.createdAt = now();
        this.following = null;
        this.followers = null;
        this.posts = null;
        this.comments = null;
        this.likes = null;
        this.followingCount = 0L;
        this.followersCount = 0L;
        this.hasProfilePicture = false;
    }
}
