package com.shayarify.backend.dto.room;

import lombok.*;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    private Long id;

    private String content;

    private Long senderId;

    private String senderUsername;

    private LocalDateTime sentAt;
}
