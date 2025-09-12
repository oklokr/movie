package com.movie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.UserInfoDto;
import com.movie.repository.UserMapper;
import com.movie.security.JwtTokenProvider;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired 
    private ObjectMapper objectMapper;

    public ApiResponse<UserInfoDto> userInfo(String token) {
        if(token == null || !tokenProvider.validateToken(token)) {
            return ApiResponse.error(401, null, "토큰정보 오류입니다.");
        }

        String userId = tokenProvider.getUserId(token);
        UserInfoDto user = objectMapper.convertValue(userMapper.getUser(userId), UserInfoDto.class);
        if(user == null) {
            return ApiResponse.error(null, "유저정보 오류입니다.");
        }

        return ApiResponse.success(user, "유저정보를 가져왔습니다.");
    }
}
