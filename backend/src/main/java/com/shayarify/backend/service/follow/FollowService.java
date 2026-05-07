package com.shayarify.backend.service.follow;

import com.shayarify.backend.dto.follow.response.FollowResponse;
import com.shayarify.backend.dto.user.UserDTO;
import com.shayarify.backend.exception.ProfileNotFoundException;
import com.shayarify.backend.exception.UserNotFoundException;
import com.shayarify.backend.model.Follow;
import com.shayarify.backend.model.Profile;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.FollowRepository;
import com.shayarify.backend.repository.ProfileRepository;
import com.shayarify.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    //Follow
    public FollowResponse followUser(Long followerId, Long followingId ){
        //Fetch Users
        User follower=userRepository.findById(followerId).orElseThrow(
                ()->new UserNotFoundException("User(Follower) id "+followerId+" not found")
        );
        User following=userRepository.findById(followingId).orElseThrow(
                ()->new UserNotFoundException("User(Following) id "+followingId+" not found")
        );

        //no self following
        if(followerId.equals(followingId)) throw new IllegalArgumentException("You can not follow urself!");

        //if not follower and following
        Follow follow=followRepository.findByFollowerAndFollowing(follower,following)
                .orElseGet(()->{
                    Follow newFollow=new Follow();
                    newFollow.setFollower(follower);
                    newFollow.setFollowing(following);
                    newFollow.setCreatedAt(LocalDateTime.now());

                    return followRepository.save(newFollow);
                });

        return new FollowResponse(
                follow.getId(),
                follower.getUsername(),
                following.getUsername(),
                LocalDateTime.now()
        );
    }

    //Unfollow
    @Transactional
    public void unfollowUser(Long followerId, Long followingId){
        User follower=userRepository.findById(followerId).orElseThrow(
                ()->new UserNotFoundException("User(Follower) id "+followerId+" not found")
        );
        User following=userRepository.findById(followingId).orElseThrow(
                ()->new UserNotFoundException("User(Following) id "+followingId+" not found")
        );

        followRepository.deleteByFollowerAndFollowing(follower,following);
    }

    //All followers
    public List<UserDTO> getFollowers(Long userId){
        User user=userRepository.findById(userId).orElseThrow(
                ()->new UserNotFoundException("User id "+userId+" not found")
        );

        return followRepository.findByFollowing(user)
                .stream()
                .map(f -> {
                    User u = f.getFollower();

                    Profile profile = profileRepository.findByUserId(u.getId())
                            .orElse(null); // avoid crash

                    return new UserDTO(
                            u.getId(),
                            u.getUsername(),
                            profile != null ? profile.getImageUrl() : null
                    );
                })
                .toList();
    }

    //All following
    public List<UserDTO> getFollowing(Long userId) {
        User user=userRepository.findById(userId).orElseThrow(
                ()->new UserNotFoundException("User id "+userId+" not found")
        );

        return followRepository.findByFollower(user)
                .stream()
                .map(f -> {
                    User u = f.getFollowing();

                    Profile profile = profileRepository.findByUserId(u.getId())
                            .orElse(null); // avoid crash

                    return new UserDTO(
                            u.getId(),
                            u.getUsername(),
                            profile != null ? profile.getImageUrl() : null
                    );
                })
                .toList();
    }

    //count followers
    public long getFollowerCount(Long userId){
        User user=userRepository.findById(userId).orElseThrow(
                ()->new UserNotFoundException("User id "+userId+" not found")
        );

        return followRepository.countByFollowing(user);
    }

    //count following
    public long getFollowingCount(Long userId){
        User user=userRepository.findById(userId).orElseThrow(
                ()->new UserNotFoundException("User id "+userId+" not found")
        );

        return followRepository.countByFollower(user);
    }

    //check if they are follower and following
    public boolean isFollowing(Long followerId, Long followingId) {
        User follower=userRepository.findById(followerId).orElseThrow(
                ()->new UserNotFoundException("User(Follower) id "+followerId+" not found")
        );
        User following=userRepository.findById(followingId).orElseThrow(
                ()->new UserNotFoundException("User(Following) id "+followingId+" not found")
        );

        return followRepository.existsByFollowerAndFollowing(follower, following);
    }
}
