package com.movie.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationScheduleListDto {
    private String theaterCode;
    private String theaterName;
    private List<TimeDto> time = new ArrayList<>();
}