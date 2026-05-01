package com.naejeon.auth.security;

import com.naejeon.auth.exception.AuthErrorCode;
import com.naejeon.common.exception.BusinessException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String HEADER_NAME = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        if (token != null) {
            try {
                Claims claims = tokenProvider.parse(token);
                if (!JwtTokenProvider.TYPE_ACCESS.equals(tokenProvider.getTokenType(claims))) {
                    throw new BusinessException(AuthErrorCode.INVALID_TOKEN);
                }
                Long userId = tokenProvider.getUserId(claims);
                String role = tokenProvider.getRole(claims);
                JwtAuthentication authentication = new JwtAuthentication(userId, role);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (BusinessException e) {
                SecurityContextHolder.clearContext();
                log.debug("JWT authentication failed: {}", e.getErrorCode().getCode());
            }
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader(HEADER_NAME);
        if (header == null || !header.startsWith(BEARER_PREFIX)) {
            return null;
        }
        String token = header.substring(BEARER_PREFIX.length()).trim();
        return token.isEmpty() ? null : token;
    }
}
