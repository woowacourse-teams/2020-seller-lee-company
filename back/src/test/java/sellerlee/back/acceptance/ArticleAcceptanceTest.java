/**
 * @author jnsorn
 */

package sellerlee.back.acceptance;

import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ArticleAcceptanceTest {
    @LocalServerPort
    private int port;

    private static RequestSpecification given() {
        return RestAssured
                .given()
                .log()
                .all();
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    /**
     Feature: 게시글 관리

     Scenario: 게시글을 관리한다.
     When 게시글을 등록한다.
     Then 게시글이 추가 되었다.
     */
    @DisplayName("게시글을 관리한다")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        return Stream.of(
                DynamicTest.dynamicTest("게시글 추가", () -> {
                    createArticle();
                })
        );
    }

    private void createArticle() {
        Map<String, String> params = new HashMap<>();
        params.put("title", "선풍기");
        params.put("price", "10000");
        params.put("category", "디지털/가전");
        params.put("contents", "진짜 시원합니다");
        params.put("member", "1");
        params.put("tags", "#선풍기 #시원쓰");

        given()
                .body(params)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post(ARTICLE_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
    }
}
