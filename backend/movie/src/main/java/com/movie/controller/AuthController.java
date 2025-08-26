package com.movie.controller;

import com.movie.security.JwtTokenProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authManager, JwtTokenProvider tokenProvider) {
        this.authManager = authManager;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
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

        // String cookieHeader = String.format(
        //     "jwtToken=%s; Max-Age=%d; Path=/; HttpOnly; SameSite=Strict",
        //     token,
        //     (int) (tokenProvider.getExpiration() / 1000)
        // );
        // response.setHeader("Set-Cookie", cookieHeader);

        return ResponseEntity.ok(cookie);
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

    @Data
    static class LoginRequest {
        private String id;
        private String passwd;
    }
}
