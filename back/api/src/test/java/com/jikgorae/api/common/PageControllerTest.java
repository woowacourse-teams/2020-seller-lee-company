package com.jikgorae.api.common;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import com.jikgorae.api.ControllerTest;

@WebMvcTest(PageController.class)
class PageControllerTest extends ControllerTest {

    @DisplayName("API 문서 페이지로 이동")
    @Test
    void showDocuments() throws Exception {
        String expectedUrl = "docs.html";

        String actualUrl = mockMvc.perform(get(PageController.API_DOCS_URI))
                .andReturn()
                .getResponse()
                .getForwardedUrl();

        assertThat(actualUrl).isEqualTo(expectedUrl);
    }

    @Test
    void showPrivacy() throws Exception {
        String expectedUrl = "privacy.html";

        String actualUrl = mockMvc.perform(get(PageController.PRIVACY_URI))
                .andReturn()
                .getResponse()
                .getForwardedUrl();

        assertThat(actualUrl).isEqualTo(expectedUrl);
    }
}
