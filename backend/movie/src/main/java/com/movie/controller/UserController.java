package com.movie.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired UserService userService;

    @PostMapping("/updateUserAdult")
    public ResponseEntity<?> updateUserAdult(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(userService.updateUserAdult(req));
    }

    @PostMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(userService.updateUserInfo(req));
    }

    @PostMapping("/getOrderHistory")
    public ResponseEntity<?> getOrderHistory(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(userService.getOrderHistory(req));
    }

    @PostMapping("/getVodList")
    public ResponseEntity<?> getVodList(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(userService.getVodList(req));
    }
}
