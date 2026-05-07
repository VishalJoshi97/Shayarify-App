package com.shayarify.backend.service.post;

import com.shayarify.backend.dto.post.request.PostRequest;
import com.shayarify.backend.dto.post.response.PostResponse;
import com.shayarify.backend.exception.PostNotFoundException;
import com.shayarify.backend.exception.UserNotFoundException;
import com.shayarify.backend.model.Post;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.PostRepository;
import com.shayarify.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

   private final UserRepository userRepo;
   private final PostRepository postRepository;
    private static final Logger logger= LoggerFactory.getLogger(PostService.class);

    //create post per user ,via id
    public void createPost(PostRequest req, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Id not found!"));

        Post post = new Post();

        post.setUser(user);
        post.setTitle(req.getTitle());
        post.setLanguage(req.getLanguage());
        post.setContent(req.getContent()); //HTML is saved directly
        postRepository.save(post);
    }

    //get all posts
    public Page<PostResponse> getAllPosts(int page,int size) {

        //first get it from db
        Page<Post> post = postRepository.findAll(
                PageRequest.of(page, size, Sort.by("id").descending())
        );

        //then to dto
        Page<PostResponse> response;

        response = post.map(postres -> new PostResponse(
                postres.getId(),
                postres.getUser().getId(),
                postres.getUser().getUsername(),
                postres.getTitle(),
                postres.getLanguage(),
                postres.getContent(),
                postres.getCreatedAt()
        ));

        return response;
    }

    //get own posts
    public Page<PostResponse> getOwnPosts(Long userId,int page,int size) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Id not found!"));

        Pageable pageable=PageRequest.of(page,size,Sort.by("createdAt").descending());

        Page<Post> posts = postRepository.findByUser(user, pageable);

        return posts.map(post -> new PostResponse(
                post.getId(),
                post.getUser().getId(),
                post.getUser().getUsername(),
                post.getTitle(),
                post.getLanguage(),
                post.getContent(),
                post.getCreatedAt()
        ));
    }

    //Get post by ID
    public PostResponse getPostById(Long id) {
     Post post=postRepository.findById(id).orElseThrow(
                ()-> new PostNotFoundException("Post not found with id: "+id)
        );

        return PostResponse.builder()
                .id(post.getId())
                .userId(post.getUser().getId())
                .username(post.getUser().getUsername())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .build();
    }

    //count posts per user
    public long getPostCount(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Id not found!"));

        return postRepository.countByUserId(user.getId());
    }


}
