package pl.marcinsalamandra.microbloggingapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreateAppUserDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdateAppUserDTO;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.entity.Post;
import pl.marcinsalamandra.microbloggingapp.exception.ConflictException;
import pl.marcinsalamandra.microbloggingapp.exception.NotFoundException;
import pl.marcinsalamandra.microbloggingapp.repository.AppUserRepository;
import pl.marcinsalamandra.microbloggingapp.repository.CommentRepository;
import pl.marcinsalamandra.microbloggingapp.repository.LikeRepository;
import pl.marcinsalamandra.microbloggingapp.repository.PostRepository;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final PasswordEncoder passwordEncoder;
    private final PictureService pictureService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User " + username + " not found"));

        Collection<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return new User(user.getUsername(), user.getPassword(), authorities);
    }

    public void checkIfUserExists(Long userId) {
        if (!appUserRepository.existsById(userId)) {
            throw new NotFoundException("User with id: " + userId + " not found");
        }
    }

    public AppUser getUser(Long userId) {
        return appUserRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User with id: " + userId + " not found"));
    }

    public Page<AppUser> getUsers(@Nullable String filter, Pageable pageable) {
        return filter == null
                ? appUserRepository.findAll(pageable)
                : appUserRepository.findAllByUsernameContaining(filter, pageable);
    }

    public Page<AppUser> getMostPopularUsers(Pageable pageable) {
        return appUserRepository.findMostPopularUsers(pageable);
    }

    public Page<AppUser> getPostLikers(Long postId, Pageable pageable) {
        return appUserRepository.findPostLikers(postId, pageable);
    }

    public Page<AppUser> getUserFollowers(Long userId, Pageable pageable) {
        checkIfUserExists(userId);

        return appUserRepository.findUserFollowers(userId, pageable);
    }

    public Page<AppUser> getUserFollowing(Long userId, Pageable pageable) {
        checkIfUserExists(userId);

        return appUserRepository.findUserFollowing(userId, pageable);
    }

    public Page<Post> getPostsOfFollowing(Long userId, Pageable pageable) {
        checkIfUserExists(userId);

        return postRepository.findPostsOfFollowing(userId, pageable);
    }

    public Page<Post> getPostsOfUser(Long userId, Pageable pageable) {
        checkIfUserExists(userId);

        return postRepository.findPostsOfUser(userId, pageable);
    }

    public Picture getProfilePicture(Long userId) {
        AppUser user = getUser(userId);

        if (!user.getHasProfilePicture()) {
            return pictureService.getPictureByKey("default_profile_picture");
        }

        return pictureService.getPictureByKey("user_" + userId);
    }

    public AppUser createUser(CreateAppUserDTO request) {
        if (appUserRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username " + request.getUsername() + " already taken");
        }

        if (appUserRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email " + request.getEmail() + " already taken");
        }

        return appUserRepository.save(
                new AppUser(
                        request.getUsername(),
                        request.getEmail(),
                        passwordEncoder.encode(request.getPassword())
                )
        );
    }

    public void followUser(Long fromUserId, Long toUserId) {
        if (fromUserId.equals(toUserId)) {
            throw new ConflictException("Can not follow yourself");
        }

        checkIfUserExists(fromUserId);
        checkIfUserExists(toUserId);

        if (appUserRepository.isFollowing(fromUserId, toUserId)) {
            throw new ConflictException("User with id: " + toUserId + " already followed");
        }

        appUserRepository.followUser(fromUserId, toUserId);
    }

    public void unfollowUser(Long fromUserId, Long toUserId) {
        checkIfUserExists(fromUserId);
        checkIfUserExists(toUserId);

        if (!appUserRepository.isFollowing(fromUserId, toUserId)) {
            throw new ConflictException("User with id: " + toUserId + " is not followed yet");
        }

        appUserRepository.unfollowUser(fromUserId, toUserId);
    }

    public void deleteUser(Long userId) {
        checkIfUserExists(userId);

        likeRepository.deleteLikesByUserId(userId);
        commentRepository.deleteCommentsByUserId(userId);
        postRepository.deletePostsByUserId(userId);

        appUserRepository.deleteUserById(userId);
    }

    public void updateProfilePicture(Long userId, MultipartFile file) throws IOException {
        AppUser user = getUser(userId);

        pictureService.updatePicture("user_" + userId, file);
        user.setHasProfilePicture(true);

        appUserRepository.save(user);
    }

    public void updateUser(Long userId, UpdateAppUserDTO request) {
        AppUser user = getUser(userId);
        user.setDescription(request.getDescription());

        if(user.getHasProfilePicture() && !request.getHasPicture()) {
            pictureService.deletePicture("user_" + userId);
            user.setHasProfilePicture(false);
        }

        appUserRepository.save(user);
    }
}
