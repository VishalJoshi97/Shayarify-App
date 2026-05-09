package com.shayarify.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomName;

    @Column(unique = true, nullable = false)
    private String roomCode;

    @Column(nullable = false)
    private Long createdBy;

    private LocalDateTime createdAt;

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "room_members",
            joinColumns = @JoinColumn(name = "room_id")
    )
    @Column(name = "user_id")
    private Set<Long> members = new HashSet<>();

    @PrePersist
    public void prePersist() {

        this.createdAt = LocalDateTime.now();

        if (this.roomCode == null || this.roomCode.isEmpty()) {
            this.roomCode = UUID.randomUUID().toString()
                    .substring(0, 6)
                    .toUpperCase();
        }
    }
}
