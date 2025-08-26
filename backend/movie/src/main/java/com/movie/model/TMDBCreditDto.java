package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TMDBCreditDto {
    private int id;
    private String name;
    private Integer gender;
    private String known_for_department;
    private String job;
}
