package com.shayarify.backend.controller;

import com.shayarify.backend.dto.CommentRequest;
import com.shayarify.backend.dto.CommentResponse;
import com.shayarify.backend.model.Comment;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.repository.CommentRepository;
import com.shayarify.backend.repository.PostRepository;
import com.shayarify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping
    public ResponseEntity<?> addComment(
            @RequestBody CommentRequest req,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        Comment comment = new Comment();
        comment.setContent(req.getContent());
        comment.setUser(userRepository.findById(userDetails.getId()).get());
        comment.setPost(postRepository.findById(req.getPostId()).get());

        commentRepository.save(comment);

        return ResponseEntity.ok("Comment added");
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getComments(@PathVariable Long postId) {

        List<CommentResponse> comments = commentRepository
                .findByPostIdOrderByCreatedAtDesc(postId)
                .stream()
                .map(c -> new CommentResponse(
                        c.getId(),
                        c.getContent(),
                        c.getUser().getId(),
                        c.getUser().getUsername(),
                        c.getCreatedAt()
                ))
                .toList();

        return ResponseEntity.ok(comments);
    }
}