package com.movie.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TMDBMovieDetailDto {
    private Boolean adult;
    private int id;
    private String title;
    private String overview;
    private String release_date;
    private String poster_path;
    private String backdrop_path;
    private double vote_average;
    private Integer runtime;

    private List<TMDBGenreDto> genres;
}
