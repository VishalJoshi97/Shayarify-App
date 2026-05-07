package com.shayarify.backend.dto.follow.response;

import com.shayarify.backend.model.Follow;
import com.shayarify.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FollowResponse {
    private Long id;
    private String follower;
    private String following;
    private LocalDateTime createdAt;
}
