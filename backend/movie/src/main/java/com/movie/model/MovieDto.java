package com.movie.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private String genreA;
    private String genreB;
    private String genreC;
    private String directA;
    private String directB;
    private String actorA;
    private String actorB;
    private String actorC;
    private String actorD;
    private String actorE;
    private String synopsis;
    private Integer runtime;
    private String ratingTpcd;
    private String movieRelease;
    private String teaser;
    private String poster;
    private String background;
    private int sales;
    private int price;
    private int discountrate;
    private String vodState;
    private String reservationState;
    private Date CREATE_DATE;
}