package com.shayarify.backend.controller;

import com.shayarify.backend.dto.profile.request.ProfileRequest;
import com.shayarify.backend.dto.profile.response.ProfileResponse;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.service.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
   private final ProfileService profileService;

   //own profile
   @GetMapping("/get")
    public ResponseEntity<?> getProfile(Authentication auth){

       CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

       ProfileResponse res=profileService.getProfile(customUser.getId());

       return ResponseEntity.ok(res);
   }

   @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileRequest req,Authentication auth){
       CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

       ProfileResponse res=profileService.updateProfile(req,customUser.getId());

       return ResponseEntity.ok(res);
   }

   @GetMapping("/get/{userId}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable Long userId){
       System.out.println("ID RECEIVED: " + userId);
       ProfileResponse res=profileService.getProfileByUserId(userId);

       return ResponseEntity.ok(res);
   }
}
