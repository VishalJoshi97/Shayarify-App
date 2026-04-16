package com.shayarify.backend.controller;

import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.service.CustomUserDetailsService;
import com.shayarify.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/shayari")
public class LikeController {

    @Autowired
    private LikeService likeService;


    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long id,
                                        @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Long userId = customUserDetails.getId();

        boolean liked = likeService.toggleLike(id, userId);

        return ResponseEntity.ok(
                Map.of(
                        "liked", liked,
                        "count", likeService.getLikeCount(id)
                )
        );
    }

    @GetMapping("/{postId}/likes")
    public ResponseEntity<?> getLikes(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId();

        return ResponseEntity.ok(
                likeService.getLikes(postId, userId) //unified response
        );
    }
}
