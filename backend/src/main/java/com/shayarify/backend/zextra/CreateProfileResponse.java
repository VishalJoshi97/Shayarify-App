package com.shayarify.backend.zextra;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProfileResponse {
    private Long profileId;
    private Long userId;
    private String bio;
    private String imageUrl;
    private LocalDateTime createdAt;
}
