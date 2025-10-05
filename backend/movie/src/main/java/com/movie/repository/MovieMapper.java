package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.CreatorDto;
import com.movie.model.InsertGenreDto;
import com.movie.model.MovieDto;


@Mapper
public interface MovieMapper {
    boolean existsGenre(String genreCode);
    boolean existsCreator(String creatorCode);
    boolean existsMovie(Integer movieCode);
    void batchInsertGenre(InsertGenreDto genre);
    void batchInsertCreator(CreatorDto creator);
    boolean insertMovie(MovieDto movie);
    boolean updateMovie(MovieDto movie);
}