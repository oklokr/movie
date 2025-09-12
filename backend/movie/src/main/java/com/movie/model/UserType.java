package com.movie.model;

import lombok.Getter;

@Getter
public enum UserType {
    USER("1"),
    ADMIN("2");

    private final String code;
    UserType(String code) { this.code = code; }

    public static UserType valueOfCode(String code) {
        for (UserType type : values()) {
            if (type.code.equals(code)) return type;
        }
        throw new IllegalArgumentException("Invalid user type code: " + code);
    }
}