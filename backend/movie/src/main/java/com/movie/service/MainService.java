package com.movie.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.MovieDto;
import com.movie.model.ReservationScheduleListDto;
import com.movie.model.TimeDto;
import com.movie.repository.AdminMapper;
import com.movie.repository.MainMapper;
import com.movie.util.PagingUtils;

@Service
public class MainService {
    @Autowired MainMapper mainMapper;
    @Autowired AdminMapper adminMapper;
    @Autowired ObjectMapper objectMapper;

    public ApiResponse<Map<String, Object>> getMovieList(Map<String, Object> req) {
        String genreTpcd = (String) req.get("genreTpcd");
        String keyword = (String) req.get("keyword");
        Map<String, Object> data = PagingUtils.<MovieDto>buildPageResponse(
            req,
            30,
            (size, offset) -> mainMapper.getMovieList(genreTpcd, keyword, offset, size),
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

    public ApiResponse<List<ReservationScheduleListDto>> getScheduleList(Map<String, Object> req) {
        List<Map<String, Object>> rawList = mainMapper.getScheduleList((String) req.get("runDate"), (String) req.get("movieCode"));
        Map<String, ReservationScheduleListDto> grouped = new LinkedHashMap<>();

        for (Map<String, Object> row : rawList) {
            String theaterCode = (String) row.get("theaterCode");
            String theaterName = (String) row.get("theaterName");
            String scheduleCode = (String) row.get("scheduleCode");
            String start = row.get("startTime").toString().substring(0,5); // HH:mm
            String end = row.get("endTime").toString().substring(0,5);

            grouped.computeIfAbsent(theaterCode, k -> {
                ReservationScheduleListDto dto = new ReservationScheduleListDto();
                dto.setTheaterCode(theaterCode);
                dto.setTheaterName(theaterName);
                return dto;
            });

            grouped.get(theaterCode).getTime().add(new TimeDto(scheduleCode, start, end));
        }
        return ApiResponse.success(new ArrayList<>(grouped.values()), "스케줄 조회 완료");
    }

    public ApiResponse<List<Map<String, Object>>> getAvailableSeats(Map<String, Object> req) {
        List<Map<String, Object>> reuslt = mainMapper.getAvailableSeats(
            (String) req.get("movieCode"),
            (String) req.get("scheduleCode"),
            (String) req.get("theaterCode")
        );
        return ApiResponse.success(reuslt, "예약 가능 좌석 조회 완료");
    }

    @Transactional
    public ApiResponse<Boolean> insertReservation(Map<String, Object> req) {
        String orderCode = (String) req.get("orderCode");
        String userId = (String) req.get("userId");
        String movieCode = (String) req.get("movieCode");
        int price = (int) req.get("price");
        String reserveDate = (String) req.get("reserveDate");
        String theaterCode = (String) req.get("theaterCode");
        String scheduleCode = (String) req.get("scheduleCode");
        Object seatCode = req.get("seatCode");

        Boolean orderHistory = mainMapper.insertOrderHistory(orderCode, userId, movieCode, price, "reservation");
        if(!orderHistory) return ApiResponse.error(orderHistory, "주문 저장이 실패하였습니다.");

        Boolean reservation = mainMapper.insertReservation(orderCode, reserveDate, userId, theaterCode, movieCode, price, scheduleCode);
        if(!reservation) return ApiResponse.error(reservation, "예약 저장이 실패하였습니다.");

        for(Object o : (List<?>) seatCode) {
            if(!(o instanceof String)) continue;
            String code = (String) o;

            String reserveSeatCode = code + "_" + orderCode;
            String seatRow = code.substring(0, 1);
            int seatNum = Integer.parseInt(code.substring(1));

            Boolean reservationSet = mainMapper.insertReservationSeat(reserveSeatCode, orderCode, seatRow, seatNum);

            if(!reservationSet) return ApiResponse.error(reservationSet, "좌석 저장이 실패했습니다.");
        }

        return ApiResponse.success(true, "예약이 완료되었습니다.");
    }
}