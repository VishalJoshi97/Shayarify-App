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

        logger.debug("JwtAuthTokenFilter called for URI:{}",request.getRequestURI());

        try {
            String jwt=parseJwt(request);
            if (jwt!=null && jwtUtils.validateJwtToken(jwt)){
                System.out.println("Valid JWT");

                String username=jwtUtils.getUserNameFromJwtToken(jwt);

                System.out.println("TOKEN USER: " + username);

                UserDetails userDetails= userDetailsService.loadUserByUsername(username);

                CustomUserDetails customUser = (CustomUserDetails) userDetails;

                System.out.println("Authorities: " + userDetails.getAuthorities());

                UsernamePasswordAuthenticationToken authenticationToken=
//                        new UsernamePasswordAuthenticationToken(customUser.getId().toString(),null,userDetails.getAuthorities());
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
userDetails.getAuthorities()                        );

                logger.debug("Roles from JWT:{}",userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                System.out.println("AUTH SET: " + SecurityContextHolder.getContext().getAuthentication());
            }
        }catch (Exception e){
            logger.debug("Cannot set user Authentication:{}",e.getMessage());
        }

        //continue filter chain as usual
        filterChain.doFilter(request,response);
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

        // ❗ Only run JWT for API endpoints
        return !path.startsWith("/api");
    }
}
