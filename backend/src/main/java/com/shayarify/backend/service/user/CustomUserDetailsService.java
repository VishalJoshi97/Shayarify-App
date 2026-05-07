package com.shayarify.backend.service.user;

import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//since we are using spring security ,so we have to implement UserDetails and UserDetailsService
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    //it accepts string only like userId.toString(),username,email
    //use case depends on u
    @Override
    @NonNull
    public UserDetails loadUserByUsername(@NonNull String email)
            throws UsernameNotFoundException {
        //now use case->for user with email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Email not found"));

        return CustomUserDetails.build(user);
    }
}
