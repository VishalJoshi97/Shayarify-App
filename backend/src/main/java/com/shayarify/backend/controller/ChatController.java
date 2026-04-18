package com.shayarify.backend.controller;

import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessageService messageService;

    //GET conversation
    @GetMapping("/{receiverId}")
    public ResponseEntity<?> getChat(
            @PathVariable Long receiverId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long senderId = userDetails.getId();

        System.out.println("🔥 SenderId: " + senderId);
        System.out.println("🔥 ReceiverId: " + receiverId);

        return ResponseEntity.ok(
                messageService.getConversation(senderId, receiverId)
        );
    }

    //SEND (optional fallback)
    @PostMapping("/send")
    public ResponseEntity<?> send(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long senderId = userDetails.getId();
        Long receiverId = Long.parseLong(body.get("receiverId"));
        String content = body.get("content");

        return ResponseEntity.ok(
                messageService.sendMessage(senderId, receiverId, content)
        );
    }

    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return ResponseEntity.ok(
                messageService.getConversations(user.getId())
        );
    }
}
