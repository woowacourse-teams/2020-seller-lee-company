package sellerlee.back.security.config;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class SecurityConfigTest {
    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @Test
    public void Kakao로그인_시도하면_OAuth인증창_등장한다() {
        given()
                .when()
                .redirects().follow(false) // 리다이렉트 방지
                .get("/oauth2/authorization/kakao")
                .then()
                .statusCode(302)
                .header("Location", containsString("https://kauth.kakao.com/oauth/authorize"));
    }
}