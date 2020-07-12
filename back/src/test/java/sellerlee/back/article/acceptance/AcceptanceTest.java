/**
 * 게시글 인수 테스트
 *
 * @author jnsorn, kouz95, lxxjn0
 */

package sellerlee.back.article.acceptance;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.jdbc.Sql;
import sellerlee.back.article.domain.Article;

import java.util.List;
import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/truncate.sql")
public class AcceptanceTest {
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
        createArticle();
        createArticle();
        return Stream.of(
                dynamicTest("게시글 전체 조회", () -> {
                    // When 게시글 전체 조회 요청을 한다.
                    List<Article> allArticles = findAllArticles();
                    // Then 게시글 목록을 응답받는다.
                    assertThat(allArticles.size()).isEqualTo(2);
                }));
    }

    private void createArticle() {
    }

    private List<Article> findAllArticles() {
        return given().when()
                .get("/articles")
                .then()
                .extract().jsonPath().getList(".", Article.class);
    }
}
