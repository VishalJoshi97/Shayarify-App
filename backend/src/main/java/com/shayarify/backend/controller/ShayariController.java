package com.shayarify.backend.controller;

import com.shayarify.backend.dto.PostRequest;
import com.shayarify.backend.dto.ShayariRequest;
import com.shayarify.backend.model.Post;
import com.shayarify.backend.model.Shayari;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.ShayariRepository;
import com.shayarify.backend.repository.UserRepository;
import com.shayarify.backend.service.PostService;
import com.shayarify.backend.service.ShayariService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shayari")
public class ShayariController {

    @Autowired
    private final ShayariService shayariService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ShayariRepository shayariRepository;
    @Autowired
    private final PostService postService;

    @PostMapping
    //create() => save() => .save()
    public ResponseEntity<?> postShayari(@RequestBody ShayariRequest request, Authentication auth) {

        String email = auth.getName(); //works for BOTH JWT & OAuth

        User user = userRepository.findByEmail(email).orElseThrow();

        Shayari shayari = new Shayari();
        shayari.setUser(user);
        shayari.setCategory(request.getCategory());
        shayari.setContent(request.getContent()); //important
        shayari.setLanguage(request.getLanguage());

        shayariRepository.save(shayari);
        return ResponseEntity.ok("Saved");
    }
    //Can view anyone else's shayari
//    @GetMapping
//    public List<Shayari> getAll(){
//   //  postService.getAll();
//        return shayariService.getAll();
//    }

    @GetMapping
    public List<Post> getAlls(){
        return postService.getAll();
    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(@RequestBody PostRequest req,
                                        Authentication auth) {

        String email = auth.getName();

        postService.createPost(req, email);

        return ResponseEntity.ok("Post created");
    }
}
