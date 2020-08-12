/**
 * @author lxxjn0
 */

package sellerlee.back.article.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.member.application.TokenResponse;

public class ArticleAcceptanceTest extends AcceptanceTest {
    public static final Long LAST_ARTICLE_ID = 4L;
    public static final int ARTICLE_SIZE = 2;

    private TokenResponse token;

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
    Stream<DynamicTest> manageArticle() throws JsonProcessingException {
        token = login();

        return Stream.of(
                dynamicTest("게시글 추가", this::post),
                dynamicTest("게시글 페이지 조회", () -> {
                    List<FeedResponse> feedArticleResponses = findArticlePage();
                    assertThat(feedArticleResponses.size()).isEqualTo(1);
                }),
                dynamicTest("게시글 상세 조회", () -> {
                    ArticleResponse articleResponse = show();
                    assertThat(articleResponse.getId()).isEqualTo(ARTICLE1.getId());
                    assertThat(articleResponse.getFavoriteState()).isTrue();
                })
        );
    }

    private void post() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST_FIXTURE);

        // @formatter:off
        given()
                .auth().oauth2(token.getAccessToken())
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
        .when()
                .post(ARTICLE_URI)
        .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
        // @formatter:on
    }

    private List<FeedResponse> findArticlePage() {
        // @formatter:off
        return
                given()
                        .auth().oauth2(token.getAccessToken())
                .when()
                        .param("lastArticleId", LAST_ARTICLE_ID)
                        .param("size", ARTICLE_SIZE)
                        .get(ARTICLE_URI)
                .then()
                        .log().all()
                        .extract()
                        .jsonPath().getList(".", FeedResponse.class);
        // @formatter:on
    }

    private ArticleResponse show() {
        String url = ARTICLE_URI + "/" + ARTICLE1.getId();

        // @formatter:off
        return
                given()
                        .auth().oauth2(token.getAccessToken())
                .when()
                        .param("memberId", MEMBER1.getId())
                        .get(url)
                .then()
                        .log().all()
                        .statusCode(HttpStatus.OK.value())
                        .extract().jsonPath().getObject(".", ArticleResponse.class);
        // @formatter:on
    }
}
