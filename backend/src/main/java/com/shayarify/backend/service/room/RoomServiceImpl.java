package com.shayarify.backend.service.room;

import com.shayarify.backend.dto.room.*;
import com.shayarify.backend.model.Room;
import com.shayarify.backend.model.RoomMessage;
import com.shayarify.backend.repository.RoomMessageRepository;
import com.shayarify.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomMessageRepository roomMessageRepository;

    @Override
    public RoomResponse createRoom(CreateRoomRequest request, Long userId) {
        Room room = Room.builder()
                .roomName(request.getRoomName())
                .createdBy(userId)
                .build();

        room.getMembers().add(userId);

        Room savedRoom = roomRepository.save(room);

        return mapToResponse(savedRoom);
    }

    @Override
    public RoomResponse joinRoom(JoinRoomRequest request, Long userId) {
        Room room = roomRepository.findByRoomCode(request.getRoomCode())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.getMembers().add(userId);

        Room updatedRoom = roomRepository.save(room);

        return mapToResponse(updatedRoom);    }

    @Override
    public RoomResponse getRoom(String roomCode) {
        Room room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return mapToResponse(room);
    }

    @Override
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void leaveRoom(String roomCode, Long userId) {
        Room room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.getMembers().remove(userId);

        roomRepository.save(room);
    }

    //message
    @Override
    public MessageResponse sendMessage(
            String roomCode,
            SendMessageRequest request,
            Long userId,
            String username
    ) {

        Room room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        if (!room.getMembers().contains(userId)) {
            throw new RuntimeException(
                    "You are not a member of this room"
            );
        }

        RoomMessage message = RoomMessage.builder()
                .content(request.getContent())
                .senderId(userId)
                .senderUsername(username)
                .room(room)
                .build();

        RoomMessage saved =
                roomMessageRepository.save(message);

        return mapMessage(saved);
    }

    @Override
    public List<MessageResponse> getMessages(
            String roomCode
    ) {

        return roomMessageRepository
                .findByRoomRoomCodeOrderBySentAtAsc(roomCode)
                .stream()
                .map(this::mapMessage)
                .toList();
    }


    @Override
    public void saveSocketMessage(ChatMessage message) {

        Room room = roomRepository
                .findByRoomCode(message.getRoomCode())
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        RoomMessage roomMessage = RoomMessage.builder()
                .content(message.getContent())
                .senderId(message.getSenderId())
                .senderUsername(message.getSenderUsername())
                .room(room)
                .build();

        roomMessageRepository.save(roomMessage);
    }



    private RoomResponse mapToResponse(Room room) {

        return RoomResponse.builder()
                .id(room.getId())
                .roomName(room.getRoomName())
                .roomCode(room.getRoomCode())
                .createdBy(room.getCreatedBy())
                .createdAt(room.getCreatedAt())
                .members(room.getMembers())
                .build();
    }

    private MessageResponse mapMessage(
            RoomMessage message
    ) {

        return MessageResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .senderId(message.getSenderId())
                .senderUsername(message.getSenderUsername())
                .sentAt(message.getSentAt())
                .build();
    }
}