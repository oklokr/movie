package com.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.movie.model.MovieDto;

@Mapper
public interface MainMapper {
    public List<MovieDto> getPopularityMovieList();
    public List<MovieDto> getAvailableMovieList();
    public List<MovieDto> getRandomMovieList();
    public List<MovieDto> getMovieList(
        @Param("genreTpcd") String genreTpcd,
        @Param("keyword") String keyword,
        @Param("offset") int offset,
        @Param("size") int size
    );
    public int countMovieList(@Param("genreTpcd") String genreTpcd, @Param("keyword") String keyword);
    public MovieDto getMovieDetail(String movieCode);
    public Boolean insertOrderHistory(
        @Param("orderCode") String orderCode,
        @Param("userId") String userId,
        @Param("movieCode") String movieCode,
        @Param("price") int price,
        @Param("orderTpye") String orderTpye
    );
} 
