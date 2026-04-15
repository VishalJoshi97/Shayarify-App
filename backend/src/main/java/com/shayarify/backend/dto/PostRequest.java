package com.shayarify.backend.dto;

import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String content; //THIS WILL STORE HTML
}
