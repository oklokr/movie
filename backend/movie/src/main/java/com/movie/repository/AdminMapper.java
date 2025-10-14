package com.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.movie.model.CreatorDto;
import com.movie.model.MovieDto;
import com.movie.model.MovieInfoListDto;
import com.movie.model.ScheduleListDto;
import com.movie.model.TheaterDto;
import com.movie.model.UserDetailInfoDto;
import com.movie.model.UserInfoDto;

@Mapper
public interface AdminMapper {
    List<UserInfoDto> getUserList(
        @Param("userId") String userId,
        @Param("userTpcd") String userTpcd,
        @Param("size") int size,
        @Param("offset") int offset
    );
    int countUserList(@Param("userId") String userId, @Param("userTpcd") String userTpcd);
    UserDetailInfoDto getUserInfo(String userId);
    Boolean changeUserTpcd(@Param("userId") String userId, @Param("userTpcd") String userTpcd);
    Boolean changeUserPasswd(String userId);

    List<MovieInfoListDto> getMovieInfoList(@Param("movieName") String movieName, @Param("size") int size, @Param("offset") int offset);
    int countMovieInfoList(String movieName);
    List<CreatorDto> getCreatorList();
    MovieDto getMovieInfo(String movieId);

    List<TheaterDto> getTheater();
    List<ScheduleListDto> getScheduleList(@Param("runDate") String runDate, @Param("theaterCode") String scheduleCode);
    Boolean insertRunSchedule(
        @Param("scheduleCode") String scheduleCode,
        @Param("theaterCode") String theaterCode,
        @Param("movieCode") String movieCode,
        @Param("runDate") String runDate,
        @Param("startTime") String startTime,
        @Param("endTime") String endTime,
        @Param("sales") Number sales,
        @Param("discountrate") Number discountrate
    );
    int checkRunSchedule(
       @Param("theaterCode") String theaterCode,
       @Param("runDate") String runDate,
       @Param("startTime") String startTime,
       @Param("endTime") String endTime
    ); 

    String getTheaterCode();
    Boolean insertTheater(@Param("theaterCode") String theaterCode, @Param("theaterName") String theaterName);
}   
