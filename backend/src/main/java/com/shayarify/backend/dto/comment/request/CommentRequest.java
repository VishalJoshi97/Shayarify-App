package com.shayarify.backend.dto.comment.request;

import lombok.Data;

@Data
public class CommentRequest {
    private Long postId;
    private String content;
}