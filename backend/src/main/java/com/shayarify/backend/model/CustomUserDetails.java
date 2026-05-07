package com.shayarify.backend.model;

import com.shayarify.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
//@NoArgsConstructor -cant do bcz all fields are mandatory
@Getter @Setter
public class CustomUserDetails implements UserDetails {

    private final Long id;
    private final String username;
    private final String password;
    private final Role role;
    private Collection<? extends GrantedAuthority> authorities;
    private final String email;

    // Static builder method
    //execute to create user whenever the class loads
    public static CustomUserDetails build(User user) {

        Role role = user.getRole();

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role.name())
        );

        return new CustomUserDetails(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                role,
                authorities,
                user.getEmail()
        );
    }


    // Required methods
    // ->username and password with getter

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
