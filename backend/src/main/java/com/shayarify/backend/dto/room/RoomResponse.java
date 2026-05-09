package com.shayarify.backend.dto.room;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomResponse {
    private Long id;

    private String roomName;

    private String roomCode;

    private Long createdBy;

    private LocalDateTime createdAt;

    private Set<Long> members;
}
