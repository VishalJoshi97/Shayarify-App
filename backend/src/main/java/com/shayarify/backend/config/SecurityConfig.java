package com.shayarify.backend.config;

import com.shayarify.backend.model.CustomUserDetails;
//import com.shayarify.backend.service.user.CustomOAuth2UserService;
import com.shayarify.backend.service.user.CustomUserDetailsService;
import com.shayarify.backend.util.JwtAuthEntryPoint;
import com.shayarify.backend.util.JwtAuthTokenFilter;
import com.shayarify.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
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
//import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
//import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
//
//    @Autowired
//    private CustomOAuth2UserService customOAuth2UserService;


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception {
        return authConfig.getAuthenticationManager();
    }
//
//    @Bean
//    public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
//        return new HttpSessionOAuth2AuthorizationRequestRepository();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception{

        //most crucial step-1
        http.csrf(AbstractHttpConfigurer::disable);

        //most crucial step-2
        http.cors(cors -> {});

        http.authorizeHttpRequests(requests->
                requests.requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/post/**").authenticated()
                        .requestMatchers("/api/profile/**").authenticated()
                        .requestMatchers("/api/chat/**").hasRole("USER")
                        .requestMatchers("/chat/**").hasRole("USER")
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/hello").authenticated()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
        );

//        http.oauth2Login(oauth2 -> oauth2
//
//                //IMPORTANT: preserve redirect_uri across OAuth flow
//                .authorizationEndpoint(auth -> auth
//                        .authorizationRequestRepository(authorizationRequestRepository())
//                )
//
//                .userInfoEndpoint(userInfo -> userInfo
//                        .userService(customOAuth2UserService)
//                )
//
//                .successHandler((request, response, authentication) -> {
//
//                    var oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User)
//                            authentication.getPrincipal();
//
//                    String email = oauthUser.getAttribute("email");
//
//                    CustomUserDetails customUserDetails =
//                            (CustomUserDetails) userDetailsService.loadUserByUsername(email);
//
//                    String jwt = jwtUtil.genTokenFromUserName(customUserDetails);
//
//                    // get dynamic redirect URI from frontend
//                    String redirectUri = request.getParameter("redirect_uri");
//
//                    if (redirectUri == null || redirectUri.isEmpty()) {
//                        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing redirect_uri");
//                        return;
//                    }
//
//                    //security check (VERY IMPORTANT)
//                    if (!redirectUri.startsWith("https://auth.expo.io")) {
//                        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid redirect URI");
//                        return;
//                    }
//
//                    String finalUrl = redirectUri
//                            + "?jwtToken=" + jwt;
////                            + "&userId=" + customUserDetails.getId()
////                            + "&email=" + email;
//
//                    response.sendRedirect(finalUrl);
//                })
//        );
        //http://localhost:8080/oauth2/authorization/google
        //http://localhost:8080/oauth2/authorization/github

        //sessions->for both jwt and oauth
        http.sessionManagement(session->
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        http.exceptionHandling(exception -> exception
                .defaultAuthenticationEntryPointFor(
                        unauthorizedHandler,
                        request -> request.getRequestURI().startsWith("/api")
                )
        );

        //fails due to no db at the start!
        http.addFilterBefore(jwtAuthTokenFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

}
