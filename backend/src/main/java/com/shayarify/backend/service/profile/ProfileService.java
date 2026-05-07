package com.shayarify.backend.service.profile;

import com.shayarify.backend.dto.profile.request.ProfileRequest;
import com.shayarify.backend.dto.profile.response.ProfileMapper;
import com.shayarify.backend.dto.profile.response.ProfileResponse;
import com.shayarify.backend.exception.ProfileNotFoundException;
import com.shayarify.backend.exception.UserNotFoundException;
import com.shayarify.backend.model.Profile;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.ProfileRepository;
import com.shayarify.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ProfileMapper profileMapper;

    //2)get own profile
    public ProfileResponse getProfile(Long userId){

        Profile profile = profileRepository.findByUserId(userId).orElseThrow(
                () -> new UserNotFoundException("User id "+userId+" not found"));

        return new ProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getBio(),
                profile.getImageUrl(),
                LocalDateTime.now()
        );
    }

    //3)update own profile
    public ProfileResponse updateProfile(ProfileRequest req,Long userId) {
        //no profile=>create for user
        Profile profile = profileRepository.findByUserId(userId).orElse(
                new Profile());

        if (profile.getUser() == null) {
            User user = userRepository.findById(userId).orElseThrow(
                    ()->new UserNotFoundException("User id "+userId+" not found"));

            profile.setUser(user);
        }

        //update if there is a profile
        profile.setBio(req.getBio());
        profile.setImageUrl(req.getImageUrl());

        profileRepository.save(profile);//updates automatically!

        return profileMapper.toResponse(profile);
    }

    //get other user's profile
    public ProfileResponse getProfileByUserId(Long userId){

//        Profile profile=profileRepository.findById(userId).orElseThrow(
//                ()->new ProfileNotFoundException("Profile id "+userId+" not found for this user"));

        Profile profile=profileRepository.findByUserId(userId).orElseThrow(
                ()->new ProfileNotFoundException("Profile with user Id "+ userId +" not found."));

        return profileMapper.toResponse(profile);
    }

}
