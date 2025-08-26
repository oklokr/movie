package com.movie.service;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.movie.model.UserDto;
import com.movie.repository.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserMapper mapper;
    @Override
    public UserDetails loadUserByUsername( String id ) throws UsernameNotFoundException {
        UserDto user = mapper.getUser( id );
        if( user == null ) throw new UsernameNotFoundException( "입력한 사용자가 없습니다" );
        
        GrantedAuthority authorities = new SimpleGrantedAuthority(user.getUserTpcd());
        return new org.springframework.security.core.userdetails.User(
            user.getUserId(),
            user.getPasswd(),
            Collections.singletonList( authorities )
        );         
    }
}
