package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.UserDto;

@Mapper
public interface UserMapper {
    public UserDto getUser( String userId );
    public Boolean signup( UserDto user );
    public Boolean existsId( String userId );
    public Boolean existsEmail( String email );
} 
