package com.movie.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class CommonService {
    
    public Map<String, Object> getCodeList() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", "200");
        result.put("data", "test");
        return result;
    }
}
