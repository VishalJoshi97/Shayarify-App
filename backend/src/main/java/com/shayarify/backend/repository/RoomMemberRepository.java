package com.shayarify.backend.repository;

import com.shayarify.backend.model.Room;
import com.shayarify.backend.model.RoomMember;
import com.shayarify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, Long> {

    boolean existsByRoomAndUser(Room room, User user);

    List<RoomMember> findByRoom(Room room);

    void deleteByRoomAndUser(Room room, User user);

    Optional<RoomMember> findByRoomAndUser(
            Room room,
            User user
    );
}
