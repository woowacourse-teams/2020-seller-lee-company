/**
 * @author jnsorn
 */

package sellerlee.back.evaluation.presentation;

import static sellerlee.back.evaluation.presentation.EvaluationController.*;
import static sellerlee.back.fixture.EvaluationFixture.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.evaluation.application.EvaluationService;

@WebMvcTest(controllers = EvaluationController.class)
public class EvaluationControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EvaluationService evaluationService;

    @DisplayName("평가 생성 시 HTTP status는 Created다.")
    @Test
    void createEvaluation() throws Exception {
        String request = objectMapper.writeValueAsString(EVALUATION_CREATE_REQUEST);
        Mockito.when(evaluationService.createEvaluation(ArgumentMatchers.any())).thenReturn(1L);

        this.mockMvc.perform(
                MockMvcRequestBuilders.post(EVALUATION_URI)
                        .content(request)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }
}
