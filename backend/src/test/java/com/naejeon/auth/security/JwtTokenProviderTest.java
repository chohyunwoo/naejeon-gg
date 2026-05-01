package com.naejeon.auth.security;

import com.naejeon.auth.exception.AuthErrorCode;
import com.naejeon.common.exception.BusinessException;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtTokenProviderTest {

    private static final String SECRET = "test-secret-must-be-at-least-32-bytes-long-aaaaa";
    private static final String ISSUER = "naejeon-gg-test";
    private static final long ACCESS_VALIDITY = 1800;
    private static final long REFRESH_VALIDITY = 1209600;

    private JwtProperties properties;
    private Clock fixedClock;
    private JwtTokenProvider provider;

    @BeforeEach
    void setUp() {
        properties = new JwtProperties(SECRET, ACCESS_VALIDITY, REFRESH_VALIDITY, ISSUER);
        properties.validate();
        fixedClock = Clock.fixed(Instant.parse("2026-05-01T00:00:00Z"), ZoneOffset.UTC);
        provider = new JwtTokenProvider(properties, fixedClock);
    }

    @Test
    void createAccessToken_includes_required_claims() {
        String token = provider.createAccessToken(42L, "USER");

        Claims claims = provider.parse(token);

        assertThat(claims.getSubject()).isEqualTo("42");
        assertThat(claims.getIssuer()).isEqualTo(ISSUER);
        assertThat(claims.get("typ", String.class)).isEqualTo("access");
        assertThat(claims.get("role", String.class)).isEqualTo("USER");
        assertThat(claims.getId()).isNotBlank();
        assertThat(claims.getExpiration().toInstant())
                .isEqualTo(fixedClock.instant().plusSeconds(ACCESS_VALIDITY));
    }

    @Test
    void createRefreshToken_includes_required_claims_and_no_role() {
        String token = provider.createRefreshToken(42L);

        Claims claims = provider.parse(token);

        assertThat(claims.getSubject()).isEqualTo("42");
        assertThat(claims.get("typ", String.class)).isEqualTo("refresh");
        assertThat(claims.get("role")).isNull();
        assertThat(claims.getExpiration().toInstant())
                .isEqualTo(fixedClock.instant().plusSeconds(REFRESH_VALIDITY));
    }

    @Test
    void parse_rejects_token_signed_with_different_secret() {
        JwtProperties otherProps = new JwtProperties(
                "another-secret-also-32-bytes-or-longer-bbbbbbbb",
                ACCESS_VALIDITY, REFRESH_VALIDITY, ISSUER
        );
        otherProps.validate();
        JwtTokenProvider otherProvider = new JwtTokenProvider(otherProps, fixedClock);
        String foreignToken = otherProvider.createAccessToken(1L, "USER");

        assertThatThrownBy(() -> provider.parse(foreignToken))
                .isInstanceOf(BusinessException.class)
                .extracting("errorCode")
                .isEqualTo(AuthErrorCode.INVALID_TOKEN);
    }

    @Test
    void parse_rejects_expired_token() {
        String token = provider.createAccessToken(42L, "USER");

        Clock laterClock = Clock.fixed(
                fixedClock.instant().plus(ACCESS_VALIDITY + 1, ChronoUnit.SECONDS),
                ZoneOffset.UTC
        );
        JwtTokenProvider laterProvider = new JwtTokenProvider(properties, laterClock);

        assertThatThrownBy(() -> laterProvider.parse(token))
                .isInstanceOf(BusinessException.class)
                .extracting("errorCode")
                .isEqualTo(AuthErrorCode.EXPIRED_TOKEN);
    }

    @Test
    void parse_rejects_malformed_token() {
        assertThatThrownBy(() -> provider.parse("not.a.jwt"))
                .isInstanceOf(BusinessException.class)
                .extracting("errorCode")
                .isEqualTo(AuthErrorCode.INVALID_TOKEN);
    }

    @Test
    void getUserId_returns_long_subject() {
        String token = provider.createAccessToken(42L, "USER");
        Claims claims = provider.parse(token);

        assertThat(provider.getUserId(claims)).isEqualTo(42L);
    }

    @Test
    void getTokenType_returns_typ_claim() {
        String access = provider.createAccessToken(1L, "USER");
        String refresh = provider.createRefreshToken(1L);

        assertThat(provider.getTokenType(provider.parse(access))).isEqualTo("access");
        assertThat(provider.getTokenType(provider.parse(refresh))).isEqualTo("refresh");
    }
}
