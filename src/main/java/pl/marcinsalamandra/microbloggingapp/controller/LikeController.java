package pl.marcinsalamandra.microbloggingapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.marcinsalamandra.microbloggingapp.service.LikeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<Void> likePost(
            @RequestParam("liked_by_id") Long likedById,
            @RequestParam("post_id") Long postId) {

        likeService.likePost(likedById, postId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unlikePost(
            @RequestParam("liked_by_id") Long likedById,
            @RequestParam("post_id") Long postId) {

        likeService.unlikePost(likedById, postId);
        return ResponseEntity.noContent().build();
    }
}
