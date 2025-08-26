package com.movie.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreatorDto {
    private String creatorCode;        // 창작자 ID
    private String creatorName;         // 이름
    private String gender;              // 성별
}
