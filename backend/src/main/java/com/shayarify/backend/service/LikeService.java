package com.shayarify.backend.service;

import com.shayarify.backend.model.Like;
import com.shayarify.backend.model.Post;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    //Toggle Like / Unlike
    public boolean toggleLike(Long postId, Long userId) {

        Optional<Like> existing =
                likeRepository.findByPostIdAndUserId(postId, userId);

        // If already liked → unlike
        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return false;
        }

        // Else → like
        try {
            Like like = new Like();

            // ⚡ No DB fetch (efficient)
            Post post = new Post();
            post.setId(postId);

            User user = new User();
            user.setId(userId);

            like.setPost(post);
            like.setUser(user);

            likeRepository.save(like);

            return true;

        } catch (Exception e) {
            // Handles race condition (duplicate like)
            return true;
        }
    }

    //Get total like count
    public long getLikeCount(Long postId) {
        return likeRepository.countByPostId(postId);
    }

    //Check if user liked the post
    public boolean isLikedByUser(Long postId, Long userId) {
        return likeRepository
                .findByPostIdAndUserId(postId, userId)
                .isPresent();
    }

    //Combined response (BEST for frontend)
    public Map<String, Object> getLikes(Long postId, Long userId) {

        long count = likeRepository.countByPostId(postId);
        boolean liked = isLikedByUser(postId, userId);

        return Map.of(
                "count", count,
                "liked", liked
        );
    }
}
