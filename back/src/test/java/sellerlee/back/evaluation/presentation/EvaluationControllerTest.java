package sellerlee.back.evaluation.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.evaluation.presentation.EvaluationController.*;
import static sellerlee.back.fixture.EvaluationFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import sellerlee.back.ControllerTest;
import sellerlee.back.evaluation.application.EvaluationService;

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
                        post(EVALUATION_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
        // @formatter:on
    }
}
