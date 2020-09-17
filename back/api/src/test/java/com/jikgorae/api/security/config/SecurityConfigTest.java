package com.jikgorae.api.security.config;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.restassured.RestAssured;

@Disabled
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class SecurityConfigTest {
    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @DisplayName("Kakao로그인_시도하면_OAuth인증창_등장한다")
    @Test
    public void Oauth2LoginPageTest() {
        given()
                .when()
                .redirects().follow(false) // 리다이렉트 방지
                .get("/oauth2/authorization/kakao")
                .then()
                .statusCode(302)
                .log().all()
                .header("Location", containsString("https://kauth.kakao.com/oauth/authorize"));
    }
}