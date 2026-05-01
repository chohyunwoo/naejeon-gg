package com.naejeon.auth.exception;

import com.naejeon.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode implements ErrorCode {

    INVALID_TOKEN("U101", "유효하지 않은 토큰입니다", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN("U102", "만료된 토큰입니다", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED("U103", "인증이 필요합니다", HttpStatus.UNAUTHORIZED),
    FORBIDDEN("U104", "접근 권한이 없습니다", HttpStatus.FORBIDDEN);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
