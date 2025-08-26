package com.movie.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.model.UserDto;
import com.movie.repository.UserMapper;
import com.movie.security.JwtTokenProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider tokenProvider;
    @Autowired
    private UserMapper userMapper;

    public AuthController(AuthenticationManager authManager, JwtTokenProvider tokenProvider) {
        this.authManager = authManager;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Map<String, Object> result = new HashMap<>();
        try {
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPasswd())
            );
            String token = tokenProvider.generateToken(authentication);

            Cookie cookie = new Cookie("jwtToken", token);
            cookie.setHttpOnly(false);                               // js 접근불가 설정
            cookie.setSecure(false);                                    // https 설정 https 사용 시 true
            cookie.setPath("/");
            cookie.setMaxAge((int) (tokenProvider.getExpiration() / 1000));  // 토큰 만료기간
            response.addCookie(cookie);
            
            UserDto user = userMapper.getUser(loginRequest.getId());
            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", user.getUserId());
            userData.put("userName", user.getUserName());
            userData.put("tel", user.getTel());
            userData.put("userTpcd", user.getUserTpcd());

            result.put("code", 200);
            result.put("data", userData);
            return ResponseEntity.ok(result);
        } catch(AuthenticationException e) {
            result.put("code", 500);
            result.put("data", null);
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        
        return ResponseEntity.ok("로그아웃");
    }

    @PostMapping("/info")
    public ResponseEntity<?> info(@CookieValue(value = "jwtToken", required = false) String token) {
        Map<String, Object> result = new HashMap<>();

        if(token == null || !tokenProvider.validateToken(token)) {
            result.put("code", 401);
            result.put("data", null);
            return ResponseEntity.ok(result);
        }

        String userId = tokenProvider.getUserId(token);
        UserDto user = userMapper.getUser(userId);

        if(user != null) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", user.getUserId());
            userData.put("userName", user.getUserName());
            userData.put("tel", user.getTel());
            userData.put("userTpcd", user.getUserTpcd());

            result.put("code", 200);
            result.put("data", userData);
        } else {
            result.put("code", 404);
            result.put("data", null);
        }
        return ResponseEntity.ok(result);
    }


    @Data
    static class LoginRequest {
        private String id;
        private String passwd;
    }
}
