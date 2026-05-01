package com.naejeon.auth.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(
        classes = {
                SecurityConfigIntegrationTest.TestApp.class,
                SecurityConfigIntegrationTest.SecuredController.class,
                SecurityConfig.class,
                ClockConfig.class,
                JwtTokenProvider.class,
                JwtAuthenticationFilter.class,
                JwtAuthenticationEntryPoint.class,
                JwtAccessDeniedHandler.class,
                PasswordEncoderConfig.class
        },
        properties = {
                "security.jwt.secret=test-secret-must-be-at-least-32-bytes-long-aaaaa",
                "security.jwt.access-token-validity-seconds=1800",
                "security.jwt.refresh-token-validity-seconds=1209600",
                "security.jwt.issuer=naejeon-gg-test"
        }
)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityConfigIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Test
    void health_endpoint_is_permitted_without_token() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk());
    }

    @Test
    void auth_path_is_permitted_without_token() throws Exception {
        mockMvc.perform(get("/api/auth/anything"))
                .andExpect(status().isNotFound());
    }

    @Test
    void protected_endpoint_returns_401_without_token() throws Exception {
        mockMvc.perform(get("/test/secured"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("U103"));
    }

    @Test
    void protected_endpoint_returns_200_with_valid_access_token() throws Exception {
        String token = tokenProvider.createAccessToken(1L, "USER");

        mockMvc.perform(get("/test/secured")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void protected_endpoint_returns_401_with_refresh_token() throws Exception {
        String refresh = tokenProvider.createRefreshToken(1L);

        mockMvc.perform(get("/test/secured")
                        .header("Authorization", "Bearer " + refresh))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error.code").value("U103"));
    }

    @org.springframework.boot.autoconfigure.SpringBootApplication(exclude = {
            org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration.class,
            org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration.class,
            org.springframework.boot.data.redis.autoconfigure.DataRedisAutoConfiguration.class,
            org.springframework.boot.flyway.autoconfigure.FlywayAutoConfiguration.class
    })
    static class TestApp {
    }

    @RestController
    static class SecuredController {
        @GetMapping("/api/health")
        String health() { return "ok"; }

        @GetMapping("/test/secured")
        String secured() { return "secured"; }
    }
}
