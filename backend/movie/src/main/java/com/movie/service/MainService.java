package com.movie.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.MovieDto;
import com.movie.repository.MainMapper;
import com.movie.util.PagingUtils;

@Service
public class MainService {
    @Autowired MainMapper mainMapper;
    @Autowired ObjectMapper objectMapper;

    public ApiResponse<Map<String, Object>> getMovieList(Map<String, Object> req) {
        String genreTpcd = (String) req.get("genreTpcd");
        String keyword = (String) req.get("keyword");
        Map<String, Object> data = PagingUtils.<MovieDto>buildPageResponse(
            req,
            5,
            (size, offset) -> mainMapper.getMovieList(genreTpcd, keyword, size, offset),
            () -> mainMapper.countMovieList(genreTpcd, keyword)
        );
        return ApiResponse.success(data, "영화목록 조회 완료");
    }

    public ApiResponse<List<MovieDto>> getPopularityMovieList() {
        List<MovieDto> result = mainMapper.getPopularityMovieList();
        return ApiResponse.success(result, "인기영화 목록을 가져왔습니다.");
    }

    public ApiResponse<List<MovieDto>> getAvailableMovieList() {
        List<MovieDto> result = mainMapper.getAvailableMovieList();
        return ApiResponse.success(result, "상영중인 영화목록을 가져왔습니다.");
    }

    public ApiResponse<List<MovieDto>> getRandomMovieList() {
        List<MovieDto> result = mainMapper.getRandomMovieList();
        return ApiResponse.success(result, "무작위 영화목록을 가져왔습니다.");
    }

    public ApiResponse<MovieDto> getMovieDetail(Map<String, Object> req) {
        MovieDto result = mainMapper.getMovieDetail((String) req.get("movieCode"));
        return ApiResponse.success(result, "영화 상세 정보를 가져왔습니다.");
    }

    public ApiResponse<Boolean> insertOrderHistory(Map<String, Object> req) {
        Boolean result = mainMapper.insertOrderHistory(
            (String) req.get("orderCode"),
            (String) req.get("userId"),
            (String) req.get("movieCode"),
            (int) req.get("price"),
            (String) req.get("orderTpye")
        );
        if(!result) return ApiResponse.error(result, "결제가 실패했습니다.");
        return ApiResponse.success(result, "결제가 완료되었습니다.");
    }
}