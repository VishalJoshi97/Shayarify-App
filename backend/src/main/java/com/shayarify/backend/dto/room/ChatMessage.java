package com.shayarify.backend.dto.room;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String roomCode;

    private String content;

    private Long senderId;

    private String senderUsername;

    private String type;
}
