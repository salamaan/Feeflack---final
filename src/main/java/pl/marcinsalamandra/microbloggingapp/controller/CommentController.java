package pl.marcinsalamandra.microbloggingapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.marcinsalamandra.microbloggingapp.converter.CommentConverter;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreateCommentDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdateCommentDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.CommentDTO;
import pl.marcinsalamandra.microbloggingapp.service.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @RequestBody CreateCommentDTO request) {

        return ResponseEntity.ok(CommentConverter.convert(commentService.createComment(request), false));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable("commentId") Long commentId) {

        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable("commentId") Long commentId,
            @RequestBody UpdateCommentDTO request) {

        commentService.updateComment(commentId, request);
        return ResponseEntity.noContent().build();
    }
}
