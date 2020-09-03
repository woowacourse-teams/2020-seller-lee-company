package sellerlee.back.evaluation.acceptance;

import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.common.PageController.*;
import static sellerlee.back.evaluation.presentation.EvaluationController.*;
import static sellerlee.back.fixture.EvaluationFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.security.web.AuthorizationType;

public class EvaluationAcceptanceTest extends AcceptanceTest {
    private TokenResponse token;

    /**
     * Feature: 평가 관리
     * <p>
     * Scenario: 평가를 관리한다.
     * <p>
     * When 평가를 한다.
     * Then 평가가 추가된다.
     */
    @DisplayName("평가를 관리한다")
    @TestFactory
    @WithMockUser
    Stream<DynamicTest> manageEvaluation() throws JsonProcessingException {
        token = joinAndLogin(MEMBER1);

        return Stream.of(
                dynamicTest("평가 추가", this::postEvaluation)
        );
    }

    private void postEvaluation() throws Exception {
        String request = objectMapper.writeValueAsString(EVALUATION_REQUEST);

        mockMvc.perform(
                post(API_URI + EVALUATION_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andDo(print())
                .andExpect(status().isCreated());

        // @formatter:off
        // given()
        //         .auth().oauth2(token.getAccessToken())
        //         .body(request)
        //         .contentType(MediaType.APPLICATION_JSON_VALUE)
        // .when()
        //         .post(API_URI+EVALUATION_URI)
        // .then()
        //         .log().all()
        //         .statusCode(HttpStatus.CREATED.value());
        // @formatter:on
    }

}
