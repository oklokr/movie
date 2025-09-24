package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailInfoDto {
    private String userId;
    private String passwd;
    private String userName;
    private String tel;
    private String email;
    private String userTpcd;
    private String userTpcdName;
    private String signupDate;
    private String adult;
    private int totalReservation;
    private int totalVod;
    private int totalPayment;
}
