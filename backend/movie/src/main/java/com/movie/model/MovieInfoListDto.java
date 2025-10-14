package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieInfoListDto {
    private String movieCode;
    private String movieName;
    private String synopsis;
    private String poster;
    private int runtime;
    private int sales;
    private int discountrate;
    private String vodState;
    private String reservationState;
    private String ratingTpcd;
    private String ratingTpcdName;
}
