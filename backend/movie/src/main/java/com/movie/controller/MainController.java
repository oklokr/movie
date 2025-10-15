package com.movie.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/main")
public class MainController {
    
    @PostMapping("/getLatestMovieList")
    public ResponseEntity<?> getLatestMovieList() {
        return ResponseEntity.ok("테스트");
    }

    // @PostMapping("/getLatestMovieList")
    // public ResponseEntity<?> getLatestMovieList() {
    //     return ResponseEntity.ok("테스트");
    // }
}
