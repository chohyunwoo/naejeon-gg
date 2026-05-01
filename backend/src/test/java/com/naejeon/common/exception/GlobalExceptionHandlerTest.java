package com.naejeon.common.exception;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GlobalExceptionHandlerTest {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new TestController())
                .setControllerAdvice(new GlobalExceptionHandler())
                .setMessageConverters(new MappingJackson2HttpMessageConverter())
                .build();
    }

    @Test
    void business_exception_returns_mapped_status_and_code() throws Exception {
        mockMvc.perform(get("/test/business"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("C001"));
    }

    @Test
    void method_argument_not_valid_returns_fields_map() throws Exception {
        String body = "{\"email\":\"not-an-email\",\"name\":\"\"}";

        mockMvc.perform(post("/test/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("C001"))
                .andExpect(jsonPath("$.error.fields.email").exists())
                .andExpect(jsonPath("$.error.fields.name").exists());
    }

    @Test
    void unknown_exception_returns_500_and_c999() throws Exception {
        mockMvc.perform(get("/test/boom"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("C999"));
    }

    @RestController
    static class TestController {

        @org.springframework.web.bind.annotation.GetMapping("/test/business")
        void business() {
            throw new BusinessException(CommonErrorCode.INVALID_INPUT);
        }

        @PostMapping("/test/validate")
        void validate(@Valid @RequestBody TestRequest req) {
        }

        @org.springframework.web.bind.annotation.GetMapping("/test/boom")
        void boom() {
            throw new IllegalStateException("boom");
        }
    }

    record TestRequest(@Email String email, @NotBlank String name) {
    }
}
