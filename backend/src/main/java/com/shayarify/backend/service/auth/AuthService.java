package com.shayarify.backend.service.auth;

import com.shayarify.backend.dto.auth.request.LoginRequest;
import com.shayarify.backend.dto.auth.request.RegisterRequest;
import com.shayarify.backend.dto.auth.response.JwtResponse;
import com.shayarify.backend.enums.Role;
import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.UserRepository;
import com.shayarify.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    //register
    public void register(RegisterRequest req){

        User user=new User();

        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(Objects.requireNonNull(passwordEncoder.encode(req.getPassword())));
        if(user.getRole()==null) user.setRole(Role.ROLE_USER);

        userRepository.save(user);
    }

    //helper methods for registration
    public boolean existsByUsername(RegisterRequest req){
        return userRepository.existsByUsername(req.getUsername());
    }

    public boolean existsByEmail(RegisterRequest req){
        return userRepository.existsByEmail(req.getEmail());
    }


    //login
    public JwtResponse login(LoginRequest req){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getEmail(),
                        req.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        //there should be data after register
        if ((customUserDetails!=null)){
           String jwt = jwtUtil.genTokenFromUserName(customUserDetails);

            return new JwtResponse(
                    customUserDetails.getId(),
                    jwt,
                    customUserDetails.getUsername(),
                    customUserDetails.getRole(),
                    LocalTime.now()
            );
        }else {
            System.out.println("User is Empty!");
        }
        return null;
    }

    //register admin
    public void createAdmin(RegisterRequest req){
        User user=new User();

        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(Objects.requireNonNull(passwordEncoder.encode(req.getPassword())));
        user.setRole(Role.ROLE_ADMIN);

        userRepository.save(user);
    }
}
