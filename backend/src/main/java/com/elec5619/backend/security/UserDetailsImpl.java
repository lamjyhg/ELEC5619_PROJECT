package com.elec5619.backend.security;

import com.elec5619.backend.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
/*
public class UserDetailsImpl implements UserDetails {

    private UUID id;
    private String username;
    private String name;
    private String email;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> auths;

    public UserDetailsImpl(UUID id, String username,String name ,String email, String password, Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.auths = authorities;
    }


    public static UserDetailsImpl build(User user){
        List<GrantedAuthority> auths= user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                auths
        );

    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.auths;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
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

    public String getName(){
        return this.name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object o){
        if(this == o){
            return  true;
        }

        if(o == null || getClass() != o.getClass()){
            return  false;
        }

        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
 */