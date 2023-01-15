package pl.marcinsalamandra.microbloggingapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.marcinsalamandra.microbloggingapp.converter.AppUserConverter;
import pl.marcinsalamandra.microbloggingapp.converter.CommentConverter;
import pl.marcinsalamandra.microbloggingapp.converter.PostConverter;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreatePostDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdatePostDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.CommentDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.PostDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.AppUserDTO;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.service.PostService;

import java.io.IOException;

import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPost(
            @PathVariable("postId") Long postId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(PostConverter.toResponse(postService.getPost(postId), issuerId));
    }

    @GetMapping
    public ResponseEntity<Page<PostDTO>> getPosts(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(PostConverter.toResponsePage(postService.getPosts(pageable), issuerId));
    }

    @GetMapping("/popular")
    public ResponseEntity<Page<PostDTO>> getMostPopularPosts(
            @PageableDefault(direction = DESC) Pageable pageable,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(PostConverter.toResponsePage(postService.getMostPopularPosts(pageable), issuerId));
    }

    @GetMapping("/{postId}/likers")
    public ResponseEntity<Page<AppUserDTO>> getPostLikers(
            @PathVariable("postId") Long postId,
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponsePage(postService.getPostLikers(postId, pageable), issuerId));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<Page<CommentDTO>> getPostComments(
            @PathVariable("postId") Long postId,
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(CommentConverter.toResponsePage(postService.getPostComments(postId, pageable), issuerId));
    }

    @GetMapping("/{postId}/picture")
    public ResponseEntity<Resource> getPostPicture(@PathVariable("postId") Long postId) {
        Picture picture = postService.getPostPicture(postId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(picture.getType()))
                .header(CONTENT_DISPOSITION, "attachment; filename=" + picture.getName())
                .body(new ByteArrayResource(picture.getData()));
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(
            @RequestBody CreatePostDTO request) {

        return ResponseEntity.ok(PostConverter.convert(postService.createPost(request), false, false));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable("postId") Long postId) {

        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{postId}/picture", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updatePostPicture(
            @PathVariable("postId") Long postId,
            @RequestBody MultipartFile picture) throws IOException {

        postService.updatePostPicture(postId, picture);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Void> updatePost(
            @PathVariable("postId") Long postId,
            @RequestBody UpdatePostDTO request) {

        postService.updatePost(postId, request);
        return ResponseEntity.noContent().build();
    }
}
