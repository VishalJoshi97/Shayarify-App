package com.shayarify.backend.controller;

import com.shayarify.backend.model.Message;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.MessageRepository;
import com.shayarify.backend.repository.UserRepository;
import com.shayarify.backend.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {


     private final SimpMessagingTemplate messagingTemplate;

     private final MessageRepository messageRepository;

     private final UserRepository userRepository;

    @MessageMapping("/chat")
    public void sendMessage(Message message) {

        message.setTimestamp(LocalDateTime.now());

        messageRepository.save(message);

        messagingTemplate.convertAndSend(
                "/topic/messages/" + message.getReceiverId(),
                message
        );

        messagingTemplate.convertAndSend(
                "/topic/messages/" + message.getSenderId(),
                message
        );
    }
}
