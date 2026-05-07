package com.shayarify.backend.repository;

import com.shayarify.backend.model.Post;
import com.shayarify.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    long countByUserId(Long userId);

    Page<Post> findByUser(User user, Pageable pageable);
}
