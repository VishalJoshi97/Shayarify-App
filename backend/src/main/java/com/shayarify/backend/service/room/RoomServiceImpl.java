package com.shayarify.backend.service.room;

import com.shayarify.backend.dto.room.*;
import com.shayarify.backend.model.Room;
import com.shayarify.backend.model.RoomMember;
import com.shayarify.backend.model.RoomMessage;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.RoomMemberRepository;
import com.shayarify.backend.repository.RoomMessageRepository;
import com.shayarify.backend.repository.RoomRepository;
import com.shayarify.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final RoomMessageRepository roomMessageRepository;
    private final UserRepository userRepository;


    @Override
    public RoomResponse createRoom(
            CreateRoomRequest request,
            Long userId
    ) {

        Room room = Room.builder()
                .roomName(request.getRoomName())
                .createdBy(userId)
                .build();

        Room savedRoom = roomRepository.save(room);

        User user = userRepository.findById(userId)
                .orElseThrow();

        RoomMember roomMember = RoomMember.builder()
                .room(savedRoom)
                .user(user)
                .joinedAt(LocalDateTime.now())
                .build();

        roomMemberRepository.save(roomMember);

        return mapToResponse(savedRoom);
    }

    @Override
    public RoomResponse joinRoom(
            JoinRoomRequest request,
            Long userId
    ) {

        Room room = roomRepository
                .findByRoomCode(request.getRoomCode())
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow();

        RoomMember roomMember = RoomMember.builder()
                .room(room)
                .user(user)
                .joinedAt(LocalDateTime.now())
                .build();

        roomMemberRepository.save(roomMember);

        return mapToResponse(room);
    }


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
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow();

        RoomMember roomMember =
                roomMemberRepository
                        .findByRoomAndUser(room, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User is not in room"
                                ));

        roomMemberRepository.delete(roomMember);
    }

    //message
    @Override
    public MessageResponse sendMessage(
            String roomCode,
            SendMessageRequest request,
            Long userId,
            String username
    ) {

        Room room = roomRepository
                .findByRoomCode(roomCode)
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow();

        boolean isMember =
                roomMemberRepository
                        .existsByRoomAndUser(room, user);

        if (!isMember) {

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