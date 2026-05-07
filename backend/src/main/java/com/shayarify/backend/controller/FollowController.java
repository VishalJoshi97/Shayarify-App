package com.shayarify.backend.controller;

import com.shayarify.backend.dto.follow.response.FollowResponse;
import com.shayarify.backend.dto.user.UserDTO;
import com.shayarify.backend.model.Follow;
import com.shayarify.backend.model.User;
import com.shayarify.backend.service.follow.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity<FollowResponse> follow(@PathVariable Long followerId,
                                                 @PathVariable Long followingId) {
       FollowResponse res= followService.followUser(followerId, followingId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{followerId}/{followingId}")
    public ResponseEntity<?> unfollow(@PathVariable Long followerId,
                                      @PathVariable Long followingId) {
         followService.unfollowUser(followerId, followingId);
        return ResponseEntity.ok(followerId+ " Unfollowed "+ followingId);
    }

    @GetMapping("/followers/{userId}")
    public List<UserDTO> followers(@PathVariable Long userId) {

        return followService.getFollowers(userId);
    }

    @GetMapping("/following/{userId}")
    public List<UserDTO> following(@PathVariable Long userId) {

        return followService.getFollowing(userId);
    }

    @GetMapping("followers/count/{userId}")
    public Long followersCount(@PathVariable Long userId){
        return followService.getFollowerCount(userId);
    }

    @GetMapping("following/count/{userId}")
    public Long followingCount(@PathVariable Long userId){
        return followService.getFollowingCount(userId);
    }

    @GetMapping("/check/{followerId}/{followingId}")
    public boolean isFollowing(@PathVariable Long followerId,
                               @PathVariable Long followingId) {
        return followService.isFollowing(followerId, followingId);
    }
}
