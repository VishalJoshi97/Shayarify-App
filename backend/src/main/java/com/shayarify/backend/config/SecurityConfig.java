package com.shayarify.backend.config;

import com.shayarify.backend.model.CustomUserDetails;
import com.shayarify.backend.service.CustomOAuth2UserService;
import com.shayarify.backend.service.CustomUserDetailsService;
import com.shayarify.backend.util.JwtAuthEntryPoint;
import com.shayarify.backend.util.JwtAuthTokenFilter;
import com.shayarify.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.*;
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthTokenFilter jwtAuthTokenFilter;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception{


        http.csrf(AbstractHttpConfigurer::disable);

        http.cors(cors -> {});

        http.authorizeHttpRequests(requests->
                requests.requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/shayari/**").authenticated()
                        .requestMatchers("/api/profile/**").authenticated()
                        .requestMatchers("/hello").authenticated()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
        );
        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                        .userService(customOAuth2UserService)
                )
                .successHandler((request, response, authentication) -> {

                    // 🔥 get OAuth user
                    var oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User)
                            authentication.getPrincipal();

                    String email = oauthUser.getAttribute("email");

                    // 🔥 load your custom user
                    CustomUserDetails customUserDetails =
                            (CustomUserDetails) userDetailsService.loadUserByUsername(email);

                    // 🔥 generate JWT
                    String jwt = jwtUtil.genTokenFromUserName(customUserDetails);

                    response.sendRedirect("http://localhost:8081/oauth-success?token=" + jwt);
                })
        );
        //http://localhost:8080/oauth2/authorization/google
        //http://localhost:8080/oauth2/authorization/github

        http.sessionManagement(session->
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        http.exceptionHandling(exception -> exception
                .defaultAuthenticationEntryPointFor(
                        unauthorizedHandler,
                        request -> request.getRequestURI().startsWith("/api")
                )
        );

        http.addFilterBefore(jwtAuthTokenFilter, UsernamePasswordAuthenticationFilter.class);//fails due to no db at the start!


        return http.build();
    }


}
