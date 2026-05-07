package com.shayarify.backend.repository;

import com.shayarify.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface MessageRepository extends JpaRepository<Message, Long> {

//    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
//            Long senderId, Long receiverId,
//            Long receiverId2, Long senderId2
//    );

    @Query("""
SELECT m FROM Message m
WHERE (m.senderId = :user1 AND m.receiverId = :user2)
   OR (m.senderId = :user2 AND m.receiverId = :user1)
ORDER BY m.timestamp ASC 
""")
    List<Message> getConversation(Long user1, Long user2);


    @Query("""
SELECT new map(
    CASE 
        WHEN m.senderId = :userId THEN r.id
        ELSE s.id
    END as userId,

    CASE 
        WHEN m.senderId = :userId THEN r.username
        ELSE s.username
    END as username,

    m.content as lastMessage,
    m.timestamp as timestamp
)
FROM Message m
JOIN User s ON m.senderId = s.id
JOIN User r ON m.receiverId = r.id
WHERE (m.senderId = :userId OR m.receiverId = :userId)
AND m.timestamp = (
    SELECT MAX(m2.timestamp)
    FROM Message m2
    WHERE 
        (m2.senderId = m.senderId AND m2.receiverId = m.receiverId)
        OR
        (m2.senderId = m.receiverId AND m2.receiverId = m.senderId)
)
ORDER BY m.timestamp DESC
""")
    List<Map<String, Object>> getConversations(Long userId);
}
