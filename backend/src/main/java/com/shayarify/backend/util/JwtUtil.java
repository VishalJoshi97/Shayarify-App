package com.shayarify.backend.util;

import com.shayarify.backend.model.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger= LoggerFactory.getLogger(JwtUtil.class);

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtExpiration}")
    private int jwtExpirationMs;

   //1)Get token from header-> Authorization: Bearer 'token'
    public String getJwtFromHeader(HttpServletRequest request){
        String bearerToken=request.getHeader("Authorization");
        logger.debug("Authorization Header:{}",bearerToken);

        if (bearerToken !=null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

    //method for decoding any jwt token
    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    //2)generate Token from username
    public String genTokenFromUserName(CustomUserDetails customUserDetails){
        String email= customUserDetails.getEmail();
        return Jwts.builder()
                .subject(email)
                .claim("role", customUserDetails.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime()+jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    //3) 2=>get username from Token
    public String getUserNameFromJwtToken(String token){
        return Jwts.parser().verifyWith((SecretKey) key()).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //4)validate Jwt Token
    public boolean validateJwtToken(String authToken){
        try{

            Jwts.parser().verifyWith((SecretKey) key()).build()
                    .parseSignedClaims(authToken);
            System.out.println("Validated Token for Login!");
            return true;
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT Token:{}",e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("JWT Token has Expired:{}",e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("JWT Token is Unsupported:{}",e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty:{}",e.getMessage());
        }
        return false;
    }
}
