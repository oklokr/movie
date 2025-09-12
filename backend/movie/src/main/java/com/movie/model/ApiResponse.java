package com.movie.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse<T> {
    private int code;
    private String msg;
    private T data;

    public static <T> ApiResponse<T> success(T data, String msg) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setData(data);
        response.setMsg(msg);
        return response;
    }

    public static <T> ApiResponse<T> error(int code, T data, String msg) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setData(data);
        response.setMsg(msg);
        return response;
    }

    public static <T> ApiResponse<T> error(T data, String msg) {
        return error(500, data, msg);
    }
}
