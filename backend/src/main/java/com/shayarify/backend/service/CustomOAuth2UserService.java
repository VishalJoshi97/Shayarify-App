package com.shayarify.backend.service;

import com.shayarify.backend.enums.Role;
import com.shayarify.backend.model.User;
import com.shayarify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2User oauthUser = super.loadUser(userRequest);

        String   email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        //GitHub may not return email
        if (email == null) {
            email = oauthUser.getAttribute("login") + "@github.com";
        }

        System.out.println("🔥 OAuth2UserService HIT 🔥");
        System.out.println("EMAIL: " + email);


        // Check DB
        String finalEmail = email;

        User user = userRepository.findByEmail(finalEmail)
                .map(existingUser -> {

                    System.out.println("USER FOUND IN DB");

                    if (existingUser.getPassword() == null || existingUser.getPassword().isEmpty()) {
                        System.out.println("FIXING PASSWORD...");

                        String encoded = passwordEncoder.encode("oauth2user");
                        System.out.println("ENCODED: " + encoded);

                        existingUser.setPassword(encoded);
                        return userRepository.save(existingUser);
                    }

                    return existingUser;
                })
                .orElseGet(() -> {

                    System.out.println("CREATING NEW USER...");

                    User newUser = new User();
                    newUser.setEmail(finalEmail);
                    newUser.setUsername(name != null ? name : finalEmail);

                    String encoded = passwordEncoder.encode("oauth2user");
                    System.out.println("ENCODED: " + encoded);

                    newUser.setPassword(encoded);
                    newUser.setRole(Role.ROLE_USER);

                    return userRepository.save(newUser);
                });


        String nameAttributeKey = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        return new DefaultOAuth2User(
                List.of(() -> user.getRole().name()),
                oauthUser.getAttributes(),
                nameAttributeKey //  dynamic
        );
    }
}
