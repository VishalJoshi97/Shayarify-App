package com.shayarify.backend.dto.auth.response;

import com.shayarify.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private Long userId;
    private String jwtToken;
    private String username;
    private Role role;
    private LocalTime time;
}
