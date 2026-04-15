package com.shayarify.backend.dto;

import com.shayarify.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data//->get ,set,rac
@AllArgsConstructor
public class JwtResponse {
    private String jwtToken;
    private String username;
    private Role role;
}
