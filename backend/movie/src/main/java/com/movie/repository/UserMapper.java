package com.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.movie.model.MovieDto;
import com.movie.model.OrderHistoryDto;
import com.movie.model.UserDto;
import com.movie.model.UserInfoDto;

@Mapper
public interface UserMapper {
    public UserInfoDto getUser( String userId );
    public Boolean signup( UserDto user );
    public Boolean existsId( String userId );
    public Boolean existsEmail( String email );
    public Boolean updateUserAdult(@Param("userId") String userId, @Param("adult") String adult);
    public Boolean updateUserInfo(
        @Param("userId") String userId,
        @Param("passwd") String passwd,
        @Param("email") String email,
        @Param("tel") String tel
    );
    public List<OrderHistoryDto> getOrderHistory(
        @Param("userID") String userID,
        @Param("size") int size,
        @Param("offset") int offset
    );
    public int countOrderHistory(String userId);
    public List<MovieDto> getVodList(String userID);
} 
