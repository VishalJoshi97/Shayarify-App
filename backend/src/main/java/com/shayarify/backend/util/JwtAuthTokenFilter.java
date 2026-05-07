package com.shayarify.backend.util;

import com.shayarify.backend.model.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthTokenFilter extends OncePerRequestFilter {

    @Autowired
     private final JwtUtil jwtUtils;

    @Autowired
     private final UserDetailsService userDetailsService;

    private static final Logger logger= LoggerFactory.getLogger(JwtAuthTokenFilter.class);

    public JwtAuthTokenFilter(JwtUtil jwtUtils, UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }


@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    try {
        String jwt = parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Passing the whole userDetails object as the Principal
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Set the context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("DEBUG: SecurityContext successfully set for: " + username);
        }
    } catch (Exception e) {
        // Change logger to Error so you can actually see what failed (e.g. expired token)
        logger.error("Cannot set user authentication: {}", e.getMessage());
    }

    // Crucial: continue the chain
    filterChain.doFilter(request, response);
}
    //2) parse request from Authorization : Bearer token
    private String parseJwt(HttpServletRequest request) {
        String jwt=jwtUtils.getJwtFromHeader(request);
        logger.debug("JwtAuthTokenFilter.java:{}",jwt);
        return jwt;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getRequestURI();

        //Only run JWT for API endpoints
        return !path.startsWith("/api");
    }
}
