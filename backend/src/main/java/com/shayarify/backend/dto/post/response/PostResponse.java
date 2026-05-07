package com.shayarify.backend.dto.post.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
    private Long id;
    private Long userId;
    private String username;
    private String title;
    private String language;
    private String content;
    private LocalDateTime createdAt;
}
