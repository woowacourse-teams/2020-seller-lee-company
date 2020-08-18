package sellerlee.back.evaluation.acceptance;

import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.evaluation.presentation.EvaluationController.*;
import static sellerlee.back.fixture.EvaluationFixture.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.member.application.TokenResponse;

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
    Stream<DynamicTest> manageEvaluation() throws JsonProcessingException {
        token = joinMemberAndLogin();

        return Stream.of(
                dynamicTest("평가 추가", this::postEvaluation)
        );
    }

    private void postEvaluation() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(EVALUATION_REQUEST);

        // @formatter:off
        given()
                .auth().oauth2(token.getAccessToken())
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
        .when()
                .post(EVALUATION_URI)
        .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
        // @formatter:on
    }

}
