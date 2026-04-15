package com.shayarify.backend.dto;

import com.shayarify.backend.enums.Role;
import lombok.Data;

@Data//->get ,set,rac
public class RegisterRequest {

    private String username;

    private String email;

    private String password;

    private Role role;
}
