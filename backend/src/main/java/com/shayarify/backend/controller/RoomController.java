package com.shayarify.backend.controller;

import com.shayarify.backend.dto.room.*;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.service.room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//only authenticated users can participate in room activity
@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public RoomResponse createRoom(
            @RequestBody CreateRoomRequest request,
            Authentication auth
    ) {
        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        return roomService.createRoom(request, customUser.getId());
    }

    @PostMapping("/join")
    public RoomResponse joinRoom(
            @RequestBody JoinRoomRequest request,
            Authentication auth
    ) {
        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        return roomService.joinRoom(request, customUser.getId());
    }

    @GetMapping
    public List<RoomResponse> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{roomCode}")
    public RoomResponse getRoom(
            @PathVariable String roomCode
    ) {
        return roomService.getRoom(roomCode);
    }

    @DeleteMapping("/{roomCode}/leave")
    public String leaveRoom(
            @PathVariable String roomCode,
            Authentication auth

    ) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        roomService.leaveRoom(roomCode, customUser.getId());

        return "Left room successfully";
    }

    //message
    @PostMapping("/{roomCode}/messages")
    public MessageResponse sendMessage(
            @PathVariable String roomCode,
            @RequestBody SendMessageRequest request,
            Authentication auth
    ) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return roomService.sendMessage(
                roomCode,
                request,
                user.getId(),
                user.getUsername()
        );
    }

    @GetMapping("/{roomCode}/messages")
    public List<MessageResponse> getMessages(
            @PathVariable String roomCode
    ) {
        return roomService.getMessages(roomCode);
    }
}
