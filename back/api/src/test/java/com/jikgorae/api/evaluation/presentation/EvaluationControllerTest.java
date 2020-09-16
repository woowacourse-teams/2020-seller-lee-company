package com.jikgorae.api.evaluation.presentation;

import static com.jikgorae.api.fixture.EvaluationFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.evaluation.application.EvaluationService;

@WebMvcTest(controllers = EvaluationController.class)
public class EvaluationControllerTest extends ControllerTest {
    @MockBean
    private EvaluationService evaluationService;

    @DisplayName("평가 생성 시 HTTP status는 Created다.")
    @Test
    void createEvaluation() throws Exception {
        String request = objectMapper.writeValueAsString(EVALUATION_REQUEST);
        when(evaluationService.createEvaluation(ArgumentMatchers.any())).thenReturn(1L);

        // @formatter:off
        mockMvc
                .perform(
                        MockMvcRequestBuilders.post(EvaluationController.EVALUATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
        // @formatter:on
    }
}
