package com.movie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.service.CommonService;

@RestController
@RequestMapping("/api/common")
public class CommonController {
    @Autowired
    CommonService commonService;
    
    @PostMapping("/getCodes")
    public ResponseEntity<?> getCodes() {
        return ResponseEntity.ok(commonService.getCodeList());
    }
}
