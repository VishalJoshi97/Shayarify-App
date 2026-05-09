package com.shayarify.backend.dto.room;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendMessageRequest {
    private String content;
}
