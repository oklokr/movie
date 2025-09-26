package com.movie.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.service.AdminService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired AdminService adminService;
    
    @PostMapping("/getUserList")
    public ResponseEntity<?> getUserList(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.getUserList(req));
    }
    
    @PostMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.getUserInfo(req));
    }
    
    @PostMapping("/changeUserTpcd")
    public ResponseEntity<?> changeUserTpcd(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.changeUserTpcd(req));
    }
    @PostMapping("/changeUserPasswd")
    public ResponseEntity<?> changeUserPasswd(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.changeUserPasswd(req));
    }

    @PostMapping("/getMovieInfoList")
    public ResponseEntity<?> getMovieInfoList(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.getMovieInfoList(req));
    }
    
    @PostMapping("/getCreatorList")
    public ResponseEntity<?> getCreatorList() {
        return ResponseEntity.ok(adminService.getCreatorList());
    }

    @PostMapping("/getMovieInfo")
    public ResponseEntity<?> getMovieInfo(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(adminService.getMovieInfo(req));
    }
}
