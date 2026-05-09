package com.shayarify.backend.repository;

import com.shayarify.backend.model.RoomMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomMessageRepository
        extends JpaRepository<RoomMessage, Long> {

    List<RoomMessage> findByRoomRoomCodeOrderBySentAtAsc(
            String roomCode
    );
}
