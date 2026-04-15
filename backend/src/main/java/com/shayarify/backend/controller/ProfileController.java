package com.shayarify.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @GetMapping("/jwt")
    public String profile(Authentication auth) {
        return "Hello " + auth.getName();
    }

    @GetMapping("/oauth")
    public String hello(Authentication auth) {
        return "OAuth User: " + auth.getName();
    }
}
