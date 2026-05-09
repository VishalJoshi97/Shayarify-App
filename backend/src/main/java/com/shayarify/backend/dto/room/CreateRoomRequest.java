package com.shayarify.backend.dto.room;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRoomRequest {
    private String roomName;
}
