package com.movie.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterDto {
    private String theaterCode;
    private String theaterName;
    private List<ScheduleListDto> schedules;
}