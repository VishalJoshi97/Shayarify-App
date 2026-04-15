package com.shayarify.backend.dto;

import lombok.Data;

@Data
public class ShayariRequest {
    private String category;
    private String content;
    private String language;
}
