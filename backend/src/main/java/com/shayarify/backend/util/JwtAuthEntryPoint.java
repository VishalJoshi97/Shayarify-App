package com.shayarify.backend.util;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger= LoggerFactory.getLogger(JwtAuthEntryPoint.class);

    @Override
    public void commence(@NonNull HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        logger.error("Unauthorized access to {}:{}",
                request.getServletPath(),
                authException.getMessage(),
                authException);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        //later move it to GEH class
        final Map<String,Object> body=new HashMap<>();

        body.put("Time-stamp",System.currentTimeMillis());
        body.put("Status",HttpServletResponse.SC_UNAUTHORIZED);
        body.put("Error","Unauthorized");
        body.put("Message","Authentication failed.Please Login");
        body.put("Path",request.getServletPath());

        final ObjectMapper mapper=new ObjectMapper();

        mapper.writeValue(response.getOutputStream(),body);
    }
}
