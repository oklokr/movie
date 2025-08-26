package com.movie.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InsertGenreDto {
    private String genreCode;   // 장르 ID
    private String genreName;   // 장르명

    public static InsertGenreDto fromTMDB(TMDBGenreDto dto) {
        return InsertGenreDto.builder()
            .genreCode(Integer.toString(dto.getId()))
            .genreName(dto.getName())
            .build();
    }
}
