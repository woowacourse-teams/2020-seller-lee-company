/**
 * @author lxxjn0
 */

package sellerlee.back.member.acceptance;

import static io.restassured.RestAssured.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    /**
     * 회원 로그인 기능
     * Given 회원이 등록되어 있다.
     *
     * When 로그인 요청을 한다.
     * Then 회원 정보 존재 여부를 응답받는다.
     */
    @DisplayName("회원 인수 테스트")
    @TestFactory
    Stream<DynamicTest> manageMember() {
        // Given 회원이 등록되어 있다.
        // data.sql 사용
        return Stream.of(
                dynamicTest("회원 로그인", () -> {
                    // When 로그인 요청을 한다.
                    login();
                })
        );
    }

    private void login() {
        given()
                .log().all()
                .when()
                .post()
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
