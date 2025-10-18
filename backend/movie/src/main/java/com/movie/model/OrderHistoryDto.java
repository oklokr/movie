package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderHistoryDto {
    private int price;
    private String movieName;
    private String orderDate;
    private String orderCode;
    private String movieCode;
    private String userId;
    private String orderType;
}
