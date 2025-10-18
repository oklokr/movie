package com.movie.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.MovieDto;
import com.movie.model.OrderHistoryDto;
import com.movie.model.UserInfoDto;
import com.movie.repository.UserMapper;
import com.movie.security.JwtTokenProvider;
import com.movie.util.PagingUtils;

@Service
public class UserService {
    @Autowired private UserMapper userMapper;
    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private ObjectMapper objectMapper;

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

    public ApiResponse<Boolean> updateUserAdult(Map<String, Object> req) {
        Boolean result = userMapper.updateUserAdult((String) req.get("userId"), (String) req.get("adult"));
        if(!result) return ApiResponse.error(result, "성인인증을 실패했습니다.");
        return ApiResponse.success(result, "성인인증 성공했습니다");
    }

    public ApiResponse<Boolean> updateUserInfo(Map<String, Object> req) {
        Boolean result = userMapper.updateUserInfo(
            (String) req.get("userId"),
            (String) req.get("passwd"),
            (String) req.get("email"),
            (String) req.get("tel")
        );

        if(!result) return ApiResponse.error(result, "회원정보 수정에 실패했습니다.");
        return ApiResponse.success(result, "회원정보 수정 완료했습니다.");
    }

    public ApiResponse<Map<String, Object>> getOrderHistory(Map<String, Object> req) {
        String userId = (String) req.get("userId");
        
        Map<String, Object> data = PagingUtils.<OrderHistoryDto>buildPageResponse(
            req,
            8,
            (size, offset) -> userMapper.getOrderHistory(userId, size, offset),
            () -> userMapper.countOrderHistory(userId)
        );

        return ApiResponse.success(data, "결제 정보를 불러왔습니다.");
    }

    public ApiResponse<List<MovieDto>> getVodList(Map<String, Object> req) {
        List<MovieDto> result = userMapper.getVodList((String) req.get("userId"));
        return ApiResponse.success(result, "VOD 리스트를 불러왔습니다.");
    }
}
