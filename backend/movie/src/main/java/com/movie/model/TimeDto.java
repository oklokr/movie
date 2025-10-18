package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimeDto {
    private String scheduleCode;
    private String start;
    private String end;

    public TimeDto() {}
    public TimeDto(String scheduleCode, String start, String end) {
        this.scheduleCode = scheduleCode;
        this.start = start;
        this.end = end;
    }
}
