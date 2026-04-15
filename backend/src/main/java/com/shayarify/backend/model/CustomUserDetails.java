package com.shayarify.backend.model;

import com.shayarify.backend.enums.Role;
import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    @Getter
    private final Long id;
    private final String username;
    private final String password;
    @Getter
    private final Role role;

    private Collection<? extends GrantedAuthority> authorities;

    // Constructor
    public CustomUserDetails(Long id, String username, String password,
                             Role role,
                             Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
    }

    // Static builder method (VERY IMPORTANT)
    public static CustomUserDetails build(User user) {

        Role role = user.getRole();

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role.name())
        );
        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                role,
                authorities
        );
    }

    public String getRoleName() {
        return role.name();
    }
    // Required methods

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
