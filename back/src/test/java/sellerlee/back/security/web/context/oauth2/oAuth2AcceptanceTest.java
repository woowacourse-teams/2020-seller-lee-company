package sellerlee.back.security.web.context.oauth2;

import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.member.presentation.AuthController.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;

public class oAuth2AcceptanceTest extends AcceptanceTest {
    @DisplayName("oauth2 회원 관리")
    @TestFactory
    Stream<DynamicTest> manageMember() {
        return Stream.of(
                dynamicTest("회원 가입", this::OAuthJoin)
        );
    }

    protected void OAuthJoin() throws JsonProcessingException {
        // @formatter:off
        given()
                .when()
                .post(LOGIN_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.TEMPORARY_REDIRECT.value());
        }
}
