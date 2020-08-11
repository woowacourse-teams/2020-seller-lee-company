/**
 * @author lxxjn0
 */

package sellerlee.back.member.acceptance;

import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;

public class MemberAcceptanceTest extends AcceptanceTest {
    /**
     * 회원 로그인 기능
     * Given 회원이 등록되어 있다.
     * <p>
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

    private void login() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(MEMBER_LOGIN_REQUEST_FIXTURE);

        given()
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/login")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
