package com.shayarify.backend.controller;

import com.shayarify.backend.dto.JwtResponse;
import com.shayarify.backend.dto.LoginRequest;
import com.shayarify.backend.dto.RegisterRequest;
import com.shayarify.backend.enums.Role;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.UserRepository;
import com.shayarify.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private    AuthenticationManager authenticationManager;
    @Autowired
    private   JwtUtil jwtUtils;
    @Autowired
    private   PasswordEncoder passwordEncoder;
    @Autowired
    private   UserRepository userRepository;

    //LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String jwt = jwtUtils.genTokenFromUserName(userDetails);


        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        userDetails.getUsername(),
                        userDetails.getRole()
                )
        );
    }

    //REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username already exists!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email already in use!");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.ROLE_USER); // default role

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createAdmin(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.ROLE_ADMIN);

        userRepository.save(user);

        return ResponseEntity.ok("Admin created");
    }


    //OAuth2 Login
    @GetMapping("/oauth-profile")
    public Map<String,Object> user(
            @AuthenticationPrincipal OAuth2User principal
    ){
        return principal.getAttributes();
    }
}