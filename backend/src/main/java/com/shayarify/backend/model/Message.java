package com.shayarify.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor//default cnstr
@AllArgsConstructor//depd Inj
@Builder//lombok
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long receiverId;

//    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime timestamp;
}
