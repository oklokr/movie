package com.movie.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TMDBCreditResponseDto {
    private List<TMDBCreditDto> cast;
    private List<TMDBCreditDto> crew;   
}
