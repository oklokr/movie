package com.movie.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.model.ApiResponse;
import com.movie.model.CreatorDto;
import com.movie.model.MovieDto;
import com.movie.model.MovieInfoListDto;
import com.movie.model.ScheduleListDto;
import com.movie.model.TheaterDto;
import com.movie.model.UserDetailInfoDto;
import com.movie.model.UserInfoDto;
import com.movie.repository.AdminMapper;
import com.movie.repository.MovieMapper;
import com.movie.util.PagingUtils;

@Service
public class AdminService {
    @Autowired AdminMapper adminMapper;
    @Autowired MovieMapper movieMapper;
    @Autowired ObjectMapper objectMapper;

    public ApiResponse<Map<String, Object>> getUserList(Map<String, Object> req) {
        String userId = (String) req.get("userId");
        String userTpcd = (String) req.get("userTpcd");

        Map<String, Object> data = PagingUtils.<UserInfoDto>buildPageResponse(
            req,
            8,
            (size, offset) -> adminMapper.getUserList(userId, userTpcd, size, offset),
            () -> adminMapper.countUserList(userId, userTpcd)
        );

        return ApiResponse.success(data, "회원 조회 완료");
    }

    public ApiResponse<UserDetailInfoDto> getUserInfo(Map<String, Object> req) {
        UserDetailInfoDto info = objectMapper.convertValue(adminMapper.getUserInfo((String) req.get("userId")), UserDetailInfoDto.class);
        return ApiResponse.success(info, "회원 조회 완료");
    }

    public ApiResponse<Boolean> changeUserTpcd(Map<String, Object> req) {
        Boolean result = adminMapper.changeUserTpcd((String) req.get("userId"), (String) req.get("userTpcd"));
        if(!result) return ApiResponse.error(false, "회원유형 변경을 실패했습니다.");
        return ApiResponse.success(true, "회원유형 변경을 완료했습니다.");
    }
    public ApiResponse<Boolean> changeUserPasswd(Map<String, Object> req) {
        Boolean result = adminMapper.changeUserPasswd((String) req.get("userId"));
        if(!result) return ApiResponse.error(false, "비밀번호 변경을 실패했습니다.");
        return ApiResponse.success(false, "비밀번호 초기화 성공했습니다. [1234]");
    }

    public ApiResponse<Map<String, Object>> getMovieInfoList(Map<String, Object> req) {
        String movieName = (String) req.get("movieName");

        Map<String, Object> data = PagingUtils.<MovieInfoListDto>buildPageResponse(
            req,
            5,
            (size, offset) -> adminMapper.getMovieInfoList(movieName, size, offset),
            () -> adminMapper.countMovieInfoList(movieName)
        );

        return ApiResponse.success(data, "영화목록 조회 완료");
    }

    public ApiResponse<List<CreatorDto>> getCreatorList() {
        List<CreatorDto> result = adminMapper.getCreatorList();
        return ApiResponse.success(result, "배우, 감독 리스트를 불러왔습니다");
    }

    public ApiResponse<MovieDto> getMovieInfo(Map<String, Object> req) {
        MovieDto result = adminMapper.getMovieInfo((String) req.get("movieId"));
        return ApiResponse.success(result, "영화 상세정보를 불러왔습니다");
    }

    public ApiResponse<Boolean> insertMovie(Map<String, Object> req) {
        MovieDto movieDto = objectMapper.convertValue(req, MovieDto.class);
        String movieCode = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        movieDto.setMovieCode(movieCode);
        Boolean result = movieMapper.insertMovie(movieDto);

        if(result) return ApiResponse.success(true, "영화 등록이 완료되었습니다.");
        return ApiResponse.error(false, "영화 등록이 실패했습니다.");
    }

    public ApiResponse<Boolean> updateMovie(Map<String,Object> req) {
        MovieDto movieDto = objectMapper.convertValue(req, MovieDto.class);

        Boolean result = movieMapper.updateMovie(movieDto);

        if(result) return ApiResponse.success(true, "영화 수정이 완료되었습니다.");
        return ApiResponse.error(false, "영화 수정이 실패했습니다");
    }

    public ApiResponse<List<TheaterDto>> getTheater(Map<String, Object> req) {
        List<TheaterDto> theaterList = adminMapper.getTheater();
        if(theaterList == null || theaterList.isEmpty()) return ApiResponse.error(null, "상영관 정보불러오기 실패입니다.");
        for(TheaterDto theater : theaterList) {
            List<ScheduleListDto> schedules = adminMapper.getScheduleList((String) req.get("runDate"), theater.getTheaterCode());
            theater.setSchedules(schedules);
        }
        return ApiResponse.success(theaterList, "상영관 정보를 불러왔습니다.");
    }

    public ApiResponse<List<TheaterDto>> insertTheater(Map<String, Object> req) {
        String code = adminMapper.getTheaterCode();
        String name = Integer.parseInt(code) + "관";
        boolean result = adminMapper.insertTheater("T" + code, name);
        if(!result) ApiResponse.error(null, "상영관 추가가 실패했습니다.");

        List<TheaterDto> theaterList = adminMapper.getTheater();
        if(theaterList == null || theaterList.isEmpty()) return ApiResponse.error(null, "상영관 정보불러오기 실패입니다.");
        for(TheaterDto theater : theaterList) {
            List<ScheduleListDto> schedules = adminMapper.getScheduleList((String) req.get("runDate"), theater.getTheaterCode());
            theater.setSchedules(schedules);
        }

        return ApiResponse.success(theaterList, "상영관 추가가 완료되었습니다");
    }

    public ApiResponse<Boolean> insertRunSchedule(Map<String, Object> req) {
        String scheduleCode = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String theaterCode = (String) req.get("theaterCode");
        String movieCode = (String) req.get("movieCode");
        String runDate = (String) req.get("runDate");
        String startTime = (String) req.get("startTime");
        String endTime = (String) req.get("endTime");
        Number price = (Number) req.get("price");
        Number discountrate = (Number) req.get("discountrate");

        int conflictCount = adminMapper.checkRunSchedule(theaterCode, runDate, startTime, endTime);
        if(conflictCount > 0) return ApiResponse.error(false, "해당 시간에 이미 상영 스케쥴이 존재합니다.");
        
        Boolean result = adminMapper.insertRunSchedule(scheduleCode, theaterCode, movieCode, runDate, startTime, endTime, price, discountrate);
        if(result) return ApiResponse.success(true, "상영등록이 완료되었습니다.");

        return ApiResponse.error(false, "상영 스케쥴 등록에 실패했습니다.");        
    }
}