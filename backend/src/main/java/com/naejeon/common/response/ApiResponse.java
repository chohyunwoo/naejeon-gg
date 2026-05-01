package com.naejeon.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.naejeon.common.exception.ErrorResponse;

public record ApiResponse<T>(
        boolean success,
        T data,
        @JsonInclude(JsonInclude.Include.NON_NULL) ErrorResponse error
) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static ApiResponse<Void> successEmpty() {
        return new ApiResponse<>(true, null, null);
    }

    public static ApiResponse<Void> error(ErrorResponse error) {
        return new ApiResponse<>(false, null, error);
    }
}
