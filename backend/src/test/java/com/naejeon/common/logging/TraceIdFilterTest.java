package com.naejeon.common.logging;

import jakarta.servlet.FilterChain;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;

class TraceIdFilterTest {

    private final TraceIdFilter filter = new TraceIdFilter();

    @Test
    void uses_incoming_header_when_present() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        String given = "abc-123";
        request.addHeader(TraceIdFilter.HEADER_NAME, given);

        FilterChain chain = (req, res) -> {
            assertThat(MDC.get(TraceIdFilter.MDC_KEY)).isEqualTo(given);
        };

        filter.doFilter(request, response, chain);

        assertThat(response.getHeader(TraceIdFilter.HEADER_NAME)).isEqualTo(given);
        assertThat(MDC.get(TraceIdFilter.MDC_KEY)).isNull();
    }

    @Test
    void generates_uuid_when_header_missing() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        String[] captured = new String[1];
        FilterChain chain = (req, res) -> {
            captured[0] = MDC.get(TraceIdFilter.MDC_KEY);
        };

        filter.doFilter(request, response, chain);

        assertThat(captured[0]).isNotBlank();
        assertThat(response.getHeader(TraceIdFilter.HEADER_NAME)).isEqualTo(captured[0]);
        assertThat(MDC.get(TraceIdFilter.MDC_KEY)).isNull();
    }

    @Test
    void blank_incoming_header_is_replaced_with_uuid() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        request.addHeader(TraceIdFilter.HEADER_NAME, "   ");

        String[] captured = new String[1];
        FilterChain chain = (req, res) -> {
            captured[0] = MDC.get(TraceIdFilter.MDC_KEY);
        };

        filter.doFilter(request, response, chain);

        assertThat(captured[0]).isNotBlank();
        assertThat(captured[0].trim()).isNotEmpty();
        assertThat(response.getHeader(TraceIdFilter.HEADER_NAME)).isEqualTo(captured[0]);
    }
}
