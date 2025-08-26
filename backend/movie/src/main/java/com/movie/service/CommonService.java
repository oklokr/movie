package com.movie.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.repository.CommonMapper;

@Service
public class CommonService {
    @Autowired
    CommonMapper commonMapper;
    
    public Map<String, Object> getCodeList() {
        List<Map<String, Object>> codeAlls = commonMapper.getCommonCodeAll();

        Map<String, Object> result = new HashMap<>();
        Map<String, List<Map<String, Object>>> grouped = new HashMap<>();

        for(Map<String, Object> row : codeAlls) {
            String commonCode = (String) row.get("COMMON_CODE");
            Map<String, Object> value = new HashMap<>();
            value.put("commonId", row.get("COMMON_ID"));
            value.put("commonName", row.get("COMMON_NAME"));
            value.put("commonValue", row.get("COMMON_VALUE"));
            value.put("commonSubValue", row.get("COMMON_SUB_VALUE"));

            List<Map<String, Object>> list = grouped.get(commonCode);
            if (list == null) {
                list = new java.util.ArrayList<>();
                grouped.put(commonCode, list);
            }
            list.add(value);
        }
        result.put("code", 200);
        result.put("data", grouped);
        return result;
    }
}
