package com.shayarify.backend.service;

import com.shayarify.backend.dto.PostRequest;
import com.shayarify.backend.model.Post;
import com.shayarify.backend.model.Shayari;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.PostRepository;
import com.shayarify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    UserRepository userRepo;

    @Autowired
    PostRepository postRepository;
    public void createPost(PostRequest req, String email) {


        User user = userRepo.findByEmail(email).orElseThrow();

        Post post = new Post();
        post.setTitle(req.getTitle());
        post.setContent(req.getContent()); // 🔥 HTML saved directly
        post.setUser(user);

        postRepository.save(post);
    }

    public List<Post> getAll() {
       return postRepository.findAll();
    }
}
