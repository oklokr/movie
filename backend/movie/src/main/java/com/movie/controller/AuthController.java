package com.movie.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.service.AuthService;
import com.movie.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(req, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        return ResponseEntity.ok(authService.logout(response));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.signup(req, response));
    }

    @PostMapping("/checkId")
    public ResponseEntity<?> checkId(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(authService.existsId(req));
    }

    @PostMapping("/info")
    public ResponseEntity<?> info(@CookieValue(value = "jwtToken", required = false) String token) {
        return ResponseEntity.ok(userService.userInfo(token));
    }
}
