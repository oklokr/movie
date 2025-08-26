package com.movie.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MovieDto {
    private String movieCode;
    private String genreCodeA;
    private String genreCodeB;
    private String genreCodeC;
    private String movieName;
    private String directCodeA;
    private String directCodeB;
    private String actorCodeA;
    private String actorCodeB;
    private String actorCodeC;
    private String actorCodeD;
    private String actorCodeE;
    private String synopsis;
    private Integer runtime;
    private String ratingTpcd;
    private String movieRelease;
    private String poster;
    private Long sales;
    private String dvdDateFrom;
    private String dvdDateTo;
    private Integer dvdPrice;
    private Integer dvdDiscount;
    private String teaser;
    private String background;
}