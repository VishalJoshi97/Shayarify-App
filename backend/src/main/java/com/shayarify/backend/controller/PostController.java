package com.shayarify.backend.controller;

import com.shayarify.backend.dto.post.request.PostRequest;
import com.shayarify.backend.dto.post.response.PostResponse;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.repository.PostRepository;
import com.shayarify.backend.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    //create post per user
    //only authenticated users can create posts
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequest req, Authentication auth) {

        String name = auth.getName(); //works for BOTH JWT & OAuth

        System.out.println("Name: " + name);

            CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();
        
        postService.createPost(req, customUser.getId());

        return ResponseEntity.ok(req.getContent());
    }

    //Pagination
    //all are authenticated post from all  authenticated users
    @GetMapping
    public ResponseEntity<Page<PostResponse>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
       Page<PostResponse> res=postService.getAllPosts(page,size);
        return ResponseEntity.ok(res);
    }

    // users can see all their own posts
    @GetMapping("/user")
    public ResponseEntity<Page<PostResponse>> getOwnPosts(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){

        Page<PostResponse> res=postService.getOwnPosts(userDetails.getId(),page,size);

        return ResponseEntity.ok(res);
    }

    //but get post by id
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id){
        PostResponse res=postService.getPostById(id);
        return ResponseEntity.ok(res);
    }


    //count no of posts per user
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getPostCount(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getPostCount(userId));
    }


}