/**
 * @author lxxjn0
 */

package sellerlee.back.member.acceptance;

import static io.restassured.RestAssured.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import sellerlee.back.member.application.TokenResponse;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MemberAcceptanceTest {
    @LocalServerPort
    private int port;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        objectMapper = new ObjectMapper();
    }

    /**
     * Feature: 회원 관리
     * <p>
     * Scenario: 회원을 관리한다.
     * <p>
     * Given 회원이 등록되어 있다.
     * <p>
     * When 로그인 요청을 한다.
     * Then 회원 정보 존재 여부를 응답받는다.
     */
    @DisplayName("회원 인수 테스트")
    @TestFactory
    Stream<DynamicTest> manageMember() {
        return Stream.of(
                dynamicTest("회원 로그인", () -> {
                    login();
                })
        );
    }

    private TokenResponse login() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(MEMBER_LOGIN_REQUEST_FIXTURE);

        return given()
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .log().all()
                .when()
                .post("/login")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().as(TokenResponse.class);
    }
}
