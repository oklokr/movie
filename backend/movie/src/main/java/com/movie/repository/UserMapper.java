package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.UserDto;

@Mapper
public interface UserMapper {
    public UserDto getUser( String id );
    public int insertUser( UserDto user );
    public int existsUserById( String id );         // 있으면 1 없으면 0
} 
