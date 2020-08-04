/**
 * @author kouz95
 */

package sellerlee.back.article.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;

import java.util.List;
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
import io.restassured.specification.RequestSpecification;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.FeedResponse;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ArticleAcceptanceTest {
    public static final Long LAST_ARTICLE_ID = 4L;
    public static final int ARTICLE_SIZE = 2;

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
    public void setUp() {
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
     * <p>
     * When 게시글을 클릭한다.
     * Then 게시글 정보와 좋아요 를 응답받는다.
     */
    @DisplayName("게시글을 관리한다")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        return Stream.of(
                dynamicTest("게시글 추가", this::createArticle),
                dynamicTest("게시글 페이지 조회", () -> {
                    List<FeedResponse> feedArticleResponses = findArticlePage();
                    assertThat(feedArticleResponses.size()).isEqualTo(1);
                }),
                dynamicTest("게시글 상세 조회", () -> {
                    ArticleResponse articleResponse = getArticleResponse();
                    assertThat(articleResponse.getId()).isEqualTo(1);
                })
        );
    }

    private ArticleResponse getArticleResponse() {
        String url = ARTICLE_URI + "/1";

        return given()
                .when()
                .param("memberId", 51L)
                .get(url)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getObject(".", ArticleResponse.class);
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

    private List<FeedResponse> findArticlePage() {
        return given()
                .when()
                .param("lastArticleId", LAST_ARTICLE_ID)
                .param("size", ARTICLE_SIZE)
                .get(ARTICLE_URI)
                .then()
                .log().all()
                .extract().jsonPath().getList(".", FeedResponse.class);
    }
}
