package com.movie.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.UserDto;
import com.movie.model.UserInfoDto;
import com.movie.repository.UserMapper;
import com.movie.security.JwtTokenProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthService {
    @Autowired AuthenticationManager authManager;
    @Autowired JwtTokenProvider tokenProvider;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired UserMapper userMapper;
    @Autowired ObjectMapper objectMapper;

    public ApiResponse<UserInfoDto> login(Map<String, Object> req, HttpServletResponse response) {
        try {
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.get("userId"), req.get("passwd"))
            );

            UserInfoDto user = objectMapper.convertValue(userMapper.getUser((String) req.get("userId")), UserInfoDto.class);

            String token = tokenProvider.generateToken(authentication, user.getUserTpcd());
            Cookie cookie = new Cookie("jwtToken", token);
            cookie.setHttpOnly(false);                               // js 접근불가 설정
            cookie.setSecure(false);                                    // https 설정 https 사용 시 true
            cookie.setPath("/");
            cookie.setMaxAge((int) (tokenProvider.getExpiration() / 1000));  // 토큰 만료기간
            response.addCookie(cookie);

            return ApiResponse.success(user, "로그인 성공");
        } catch(AuthenticationException e) {
            return ApiResponse.error(null, "로그인 실패 관리자에게 문의해주세요.");
        }
    }

    public ApiResponse<Boolean> logout(HttpServletResponse response) {
        try {
            Cookie cookie = new Cookie("jwtToken", null);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);

            return ApiResponse.success(true, "로그아웃");
        } catch(Exception e) {
            return ApiResponse.error(null, "로그아웃 실패");
        }
    }
    
    public ApiResponse<UserInfoDto> signup(Map<String, Object> req, HttpServletResponse response) {
        if(userMapper.existsEmail((String) req.get("email"))) {
            return ApiResponse.error(null, "중복된 이메일 입니다.");
        }
        UserDto userDto = objectMapper.convertValue(req, UserDto.class);
        String rawPasswd = userDto.getPasswd();
        String encodePasswd = passwordEncoder.encode(rawPasswd);
        userDto.setPasswd(encodePasswd);
        if(!userMapper.signup(userDto)) {
            return ApiResponse.error(null, "회원가입 오류");
        }
        return login(req, response);
    }

    public ApiResponse<Boolean> existsId(Map<String, Object> req) {
        String userId = (String) req.get("userId");
        if(userId.isEmpty()) {
            return ApiResponse.error(false, "아이디를 입력해 주세요.");
        }
        if(userMapper.existsId(userId)) {
            return ApiResponse.error(false, "중복된 아이디 입니다.");
        }
        return ApiResponse.success(true, "사용 가능한 아이디 입니다.");
    }
}
