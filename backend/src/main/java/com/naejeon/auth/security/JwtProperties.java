package com.naejeon.auth.security;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.nio.charset.StandardCharsets;

@ConfigurationProperties(prefix = "security.jwt")
public record JwtProperties(
        String secret,
        long accessTokenValiditySeconds,
        long refreshTokenValiditySeconds,
        String issuer
) {

    @PostConstruct
    public void validate() {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("security.jwt.secret must be at least 32 bytes (256 bits) for HS256");
        }
        if (accessTokenValiditySeconds <= 0) {
            throw new IllegalStateException("security.jwt.access-token-validity-seconds must be > 0");
        }
        if (refreshTokenValiditySeconds <= 0) {
            throw new IllegalStateException("security.jwt.refresh-token-validity-seconds must be > 0");
        }
        if (issuer == null || issuer.isBlank()) {
            throw new IllegalStateException("security.jwt.issuer must not be blank");
        }
    }
}
