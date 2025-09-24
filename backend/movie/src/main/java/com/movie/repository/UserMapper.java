package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.UserDto;
import com.movie.model.UserInfoDto;

@Mapper
public interface UserMapper {
    public UserInfoDto getUser( String userId );
    public Boolean signup( UserDto user );
    public Boolean existsId( String userId );
    public Boolean existsEmail( String email );
} 
