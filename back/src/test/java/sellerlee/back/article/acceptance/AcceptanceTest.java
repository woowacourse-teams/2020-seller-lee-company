/**
 * @author kouz95
 */

package sellerlee.back.article.acceptance;

import static io.restassured.RestAssured.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import io.restassured.RestAssured;
import sellerlee.back.article.application.ArticleResponse;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    public static final Long LAST_ARTICLE_ID = 3L;
    public static final int ARTICLE_SIZE = 2;

    @LocalServerPort
    public int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    /**
     * 게시글 전체 조회 기능
     * Given 게시글이 여러 개 추가되어 있다.
     * <p>
     * When 게시글 전체 조회 요청을 한다.
     * Then 게시글 목록을 응답밥는다.
     */
    @DisplayName("게시글 인수 테스트")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        // Given 게시글이 여러개 추가되어 있다.
        // data.sql 사용
        return Stream.of(
                dynamicTest("게시글 페이지 조회", () -> {
                    // When 게시글 페이지 조회 요청을 한다.
                    List<ArticleResponse> articleResponses = findArticlePage();
                    // Then 게시글 페이지를 응답받는다.
                    assertThat(articleResponses.size()).isEqualTo(2);
                }));
    }

    private List<ArticleResponse> findArticlePage() {
        return given()
                .log().all()
                .when()
                .param("lastArticleId", LAST_ARTICLE_ID)
                .param("size", ARTICLE_SIZE)
                .get(ARTICLE_URI)
                .then()
                .log().all()
                .extract().jsonPath().getList(".", ArticleResponse.class);
    }
}
