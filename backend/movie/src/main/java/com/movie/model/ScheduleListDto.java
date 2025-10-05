package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleListDto {
    private String scheduleCode;
    private String TheaterCode;
    private String movieCode;
    private String runDate;
    private String startTime;
    private String endTime;
}