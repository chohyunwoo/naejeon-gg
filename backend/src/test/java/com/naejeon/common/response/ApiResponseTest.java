package com.naejeon.common.response;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.naejeon.common.exception.CommonErrorCode;
import com.naejeon.common.exception.ErrorResponse;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ApiResponseTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void success_with_data_serializes_data_and_omits_error() throws Exception {
        ApiResponse<String> response = ApiResponse.success("hello");

        JsonNode node = objectMapper.valueToTree(response);

        assertThat(node.get("success").asBoolean()).isTrue();
        assertThat(node.has("data")).isTrue();
        assertThat(node.get("data").asText()).isEqualTo("hello");
        assertThat(node.has("error")).isFalse();
    }

    @Test
    void success_without_body_keeps_data_key_as_null() throws Exception {
        ApiResponse<Void> response = ApiResponse.successEmpty();

        JsonNode node = objectMapper.valueToTree(response);

        assertThat(node.get("success").asBoolean()).isTrue();
        assertThat(node.has("data")).isTrue();
        assertThat(node.get("data").isNull()).isTrue();
        assertThat(node.has("error")).isFalse();
    }

    @Test
    void error_response_serializes_error_and_keeps_data_null() throws Exception {
        ErrorResponse err = ErrorResponse.of(CommonErrorCode.INVALID_INPUT);
        ApiResponse<Void> response = ApiResponse.error(err);

        JsonNode node = objectMapper.valueToTree(response);

        assertThat(node.get("success").asBoolean()).isFalse();
        assertThat(node.has("error")).isTrue();
        assertThat(node.get("error").get("code").asText()).isEqualTo("C001");
        assertThat(node.get("error").has("fields")).isFalse();
    }
}
