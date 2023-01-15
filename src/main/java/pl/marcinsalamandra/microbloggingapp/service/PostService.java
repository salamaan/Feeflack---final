package pl.marcinsalamandra.microbloggingapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreatePostDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdatePostDTO;
import pl.marcinsalamandra.microbloggingapp.entity.AppUser;
import pl.marcinsalamandra.microbloggingapp.entity.Comment;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.entity.Post;
import pl.marcinsalamandra.microbloggingapp.exception.NotFoundException;
import pl.marcinsalamandra.microbloggingapp.repository.CommentRepository;
import pl.marcinsalamandra.microbloggingapp.repository.LikeRepository;
import pl.marcinsalamandra.microbloggingapp.repository.PostRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final AppUserService appUserService;
    private final PictureService pictureService;

    public void checkIfPostExists(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new NotFoundException("Post with id: " + postId + " not found");
        }
    }

    public Post getPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post with id: " + postId + " not found"));
    }

    public Page<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Page<Post> getMostPopularPosts(Pageable pageable) {
        return postRepository.findMostPopularPosts(pageable);
    }

    public Page<Comment> getPostComments(Long postId, Pageable pageable) {
        checkIfPostExists(postId);

        return commentRepository.findPostComments(postId, pageable);
    }

    public Page<AppUser> getPostLikers(Long postId, Pageable pageable) {
        checkIfPostExists(postId);

        return appUserService.getPostLikers(postId, pageable);
    }

    public Picture getPostPicture(Long postId) {
        Post post = getPost(postId);

        if (!post.getHasPicture()) {
            throw new NotFoundException("Post picture not found");
        }

        return pictureService.getPictureByKey("post_" + postId);
    }

    public Post createPost(CreatePostDTO request) {
        return postRepository.save(new Post(
                appUserService.getUser(request.getPostedById()),
                request.getContent()
        ));
    }

    public void deletePost(Long postId) {
        checkIfPostExists(postId);

        commentRepository.deleteCommentsByPostId(postId);
        likeRepository.deleteLikesByPostId(postId);
        postRepository.deletePostById(postId);
    }

    public void updatePostPicture(Long postId, MultipartFile file) throws IOException {
        Post post = getPost(postId);

        pictureService.updatePicture("post_" + postId, file);
        post.setHasPicture(true);

        postRepository.save(post);
    }

    public void updatePost(Long postId, UpdatePostDTO request) {
        Post post = getPost(postId);
        post.setContent(request.getContent());

        if(post.getHasPicture() && !request.getHasPicture()) {
            pictureService.deletePicture("post_" + postId);
            post.setHasPicture(false);
        }

        postRepository.save(post);
    }
}
