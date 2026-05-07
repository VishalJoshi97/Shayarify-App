package com.shayarify.backend.dto.post.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {
    private String title;
    private String language;
    private String content; //THIS WILL STORE HTML
}
