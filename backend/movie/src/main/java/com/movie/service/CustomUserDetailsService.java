package com.movie.service;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.movie.model.UserInfoDto;
import com.movie.model.UserType;
import com.movie.repository.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserMapper mapper;
    @Override
    public UserDetails loadUserByUsername( String userId ) throws UsernameNotFoundException {
        UserInfoDto user = mapper.getUser( userId );
        if( user == null ) throw new UsernameNotFoundException( "입력한 사용자가 없습니다" );
        
        GrantedAuthority authorities = new SimpleGrantedAuthority("ROLE_" + UserType.valueOfCode(user.getUserTpcd()).name());
        return new org.springframework.security.core.userdetails.User(
            user.getUserId(),
            user.getPasswd(),
            Collections.singletonList( authorities )
        );         
    }
}
