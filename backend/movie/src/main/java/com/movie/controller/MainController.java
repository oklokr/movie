package com.movie.controller;

import org.springframework.web.bind.annotation.RestController;

import com.movie.service.MainService;

import okhttp3.Response;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/main")
public class MainController {
    @Autowired MainService mainService;
    
    @PostMapping("/getAvailableMovieList")
    public ResponseEntity<?> getAvailableMovieList() {
        return ResponseEntity.ok(mainService.getAvailableMovieList());
    }

    @PostMapping("/getPopularityMovieList")
    public ResponseEntity<?> getPopularityMovieList() {
        return ResponseEntity.ok(mainService.getPopularityMovieList());
    }

    @PostMapping("/getRandomMovieList")
    public ResponseEntity<?> getRandomMovieList() {
        return ResponseEntity.ok(mainService.getRandomMovieList());
    }

    @PostMapping("/getMovieList")
    public ResponseEntity<?> getMovieList(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(mainService.getMovieList(req));
    }

    @PostMapping("/getMovieDetail")
    public ResponseEntity<?> getMovieDetail(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(mainService.getMovieDetail(req));
    }

    @PostMapping("/insertOrderHistory")
    public ResponseEntity<?> insertOrderHistory(@RequestBody Map<String, Object> req) {
        return ResponseEntity.ok(mainService.insertOrderHistory(req));
    }
}
