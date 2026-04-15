package com.shayarify.backend.service;

import com.shayarify.backend.dto.RegisterRequest;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.UserRepository;
import com.shayarify.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//@Service
//depd Inj
@RequiredArgsConstructor//A constructor for
// all final fields and any fields marked with @NonNull
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    //register user=>save() + token gen
    //user->password->encode->token gen
    public String register(RegisterRequest request){
        User user=User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);//inbuilt method in repo

//        return jwtUtil.genTokenFromUserName(user.getEmail());
        return "hii";
    }

    //login user=>findByEmail() + token gen

    public String login(RegisterRequest request){
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow();// handle in GEH class

        //pretty cool method
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw  new RuntimeException("Invalid Password Janab");
        }

        return "hello";

    }

}
