package com.movie.repository;

import java.util.List;
import java.util.Map;

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
    public List<Map<String, Object>> getScheduleList(
        @Param("runDate") String runDate,
        @Param("movieCode") String movieCode
    );

    public List<Map<String, Object>> getAvailableSeats(
        @Param("movieCode") String movieCode,
        @Param("scheduleCode") String scheduleCode,
        @Param("theaterCode") String theaterCode
    );

    public Boolean insertReservation(
        @Param("reserveCode") String reserveCode,
        @Param("reserveDate") String reserveDate,
        @Param("userId") String userId,
        @Param("theaterCode") String theaterCode,
        @Param("movieCode") String movieCode,
        @Param("price") int price,
        @Param("scheduleCode") String scheduleCode
    );
    public Boolean insertReservationSeat(
        @Param("reserveSeatCode") String reserveSeatCode,
        @Param("reserveCode") String reserveCode,
        @Param("seatRow") String seatRow,
        @Param("seatNum") int seatNum
    );
} 
