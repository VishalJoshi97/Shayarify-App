package com.shayarify.backend.dto.profile.response;

import com.shayarify.backend.model.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ProfileMapper {
    public ProfileResponse toResponse(Profile profile){
        if (profile==null) return null;

        return new ProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getBio(),
                profile.getImageUrl(),
                LocalDateTime.now()
        );
    }
}
