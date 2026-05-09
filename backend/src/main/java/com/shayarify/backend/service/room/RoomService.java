package com.shayarify.backend.service.room;

import com.shayarify.backend.dto.room.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomService {

    RoomResponse createRoom(CreateRoomRequest request, Long userId);

    RoomResponse joinRoom(JoinRoomRequest request, Long userId);

    RoomResponse getRoom(String roomCode);

    List<RoomResponse> getAllRooms();

    void leaveRoom(String roomCode, Long userId);

    //message
    MessageResponse sendMessage(
            String roomCode,
            SendMessageRequest request,
            Long userId,
            String username
    );

    List<MessageResponse> getMessages(String roomCode);

    void saveSocketMessage(ChatMessage message);
}
