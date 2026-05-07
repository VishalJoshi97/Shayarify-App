package com.shayarify.backend.dto.profile.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private Long profileId;
    private Long userId;
    private String username;
    private String bio;
    private String imageUrl;
    private LocalDateTime createdAt;
}
