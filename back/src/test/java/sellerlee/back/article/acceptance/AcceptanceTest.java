/**
 * @author jnsorn
 */

package sellerlee.back.article.acceptance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import sellerlee.back.article.application.ArticleResponse;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE_CREATE_REQUEST_FIXTURE;
import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    @LocalServerPort
    private int port;

    private ObjectMapper objectMapper;

    private static RequestSpecification given() {
        return RestAssured
                .given()
                .log()
                .all();
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        objectMapper = new ObjectMapper();
    }

    /**
     * Feature: 게시글 관리
     * <p>
     * Scenario: 게시글을 관리한다.
     * <p>
     * When 게시글을 등록한다.
     * Then 게시글이 추가되었다.
     * <p>
     * When 전체 게시글을 조회한다.
     * Then 게시글이 조회된다.
     */
    @DisplayName("게시글을 관리한다")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        return Stream.of(
                dynamicTest("게시글 추가", () -> {
                    createArticle();
                }),
                dynamicTest("게시글 전체 조회", () -> {
                    List<ArticleResponse> allArticleResponses = findAllArticles();
                    assertThat(allArticleResponses.size()).isEqualTo(1);
                })
        );
    }

    private void createArticle() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST_FIXTURE);

        given()
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post(ARTICLE_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    private List<ArticleResponse> findAllArticles() {
        return given()
                .when()
                .get(ARTICLE_URI)
                .then()
                .log().all()
                .extract().jsonPath().getList(".", ArticleResponse.class);
    }
}
