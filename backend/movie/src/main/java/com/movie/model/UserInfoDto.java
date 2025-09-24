package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDto {
    private String userId;
    private String passwd;
    private String userName;
    private String tel;
    private String email;
    private String userTpcd;
    private String userTpcdName;
    private String signupDate;
    private String adult;
}
