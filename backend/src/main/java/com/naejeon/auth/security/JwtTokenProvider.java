package com.naejeon.auth.security;

import com.naejeon.auth.exception.AuthErrorCode;
import com.naejeon.common.exception.BusinessException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    public static final String CLAIM_TOKEN_TYPE = "typ";
    public static final String CLAIM_ROLE = "role";
    public static final String TYPE_ACCESS = "access";
    public static final String TYPE_REFRESH = "refresh";

    private final JwtProperties properties;
    private final Clock clock;
    private final SecretKey signingKey;

    public JwtTokenProvider(JwtProperties properties, Clock clock) {
        this.properties = properties;
        this.clock = clock;
        this.signingKey = Keys.hmacShaKeyFor(properties.secret().getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(Long userId, String role) {
        return buildToken(userId, TYPE_ACCESS, role, properties.accessTokenValiditySeconds());
    }

    public String createRefreshToken(Long userId) {
        return buildToken(userId, TYPE_REFRESH, null, properties.refreshTokenValiditySeconds());
    }

    public Claims parse(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .clock(() -> Date.from(clock.instant()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new BusinessException(AuthErrorCode.EXPIRED_TOKEN);
        } catch (JwtException | IllegalArgumentException e) {
            throw new BusinessException(AuthErrorCode.INVALID_TOKEN);
        }
    }

    public Long getUserId(Claims claims) {
        return Long.parseLong(claims.getSubject());
    }

    public String getTokenType(Claims claims) {
        return claims.get(CLAIM_TOKEN_TYPE, String.class);
    }

    public String getRole(Claims claims) {
        return claims.get(CLAIM_ROLE, String.class);
    }

    private String buildToken(Long userId, String type, String role, long validitySeconds) {
        var now = clock.instant();
        var exp = now.plusSeconds(validitySeconds);
        var builder = Jwts.builder()
                .issuer(properties.issuer())
                .subject(String.valueOf(userId))
                .id(UUID.randomUUID().toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .claim(CLAIM_TOKEN_TYPE, type);
        if (role != null) {
            builder.claim(CLAIM_ROLE, role);
        }
        return builder.signWith(signingKey, Jwts.SIG.HS256).compact();
    }
}
