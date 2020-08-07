package sellerlee.back.favorite.acceptance;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.favorite.application.FavoriteCreateRequest;

import java.util.stream.Stream;

import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import static sellerlee.back.favorite.presentation.FavoriteController.FAVORITE_URI;
import static sellerlee.back.fixture.MemberFixture.MEMBER1;

public class FavoriteAcceptanceTest extends AcceptanceTest {
    /**
     * Feature: 찜 관리
     * <p>
     * Scenario: 찜을 관리한다.
     * <p>
     * Given 게시글이 생성되어 있다.
     * And 멤버가 생성되어 있다.
     * <p>
     * When 찜 등록을 한다.
     * Then 찜이 추가 된다.
     * <p>
     * When 찜 삭제를 한다.
     * Then 찜이 삭제 된다.
     */
    @TestFactory
    Stream<DynamicTest> manageChatRoom() throws JsonProcessingException {
        Long articleId = extractId(createArticle());

        return Stream.of(
            dynamicTest("찜 등록", () -> {
                extractId(createFavorite(articleId, MEMBER1.getId()));
            })
        );
    }

    private String createFavorite(Long articleId, Long memberId) throws JsonProcessingException {
        FavoriteCreateRequest request = new FavoriteCreateRequest(articleId, memberId);

        return given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(objectMapper.writeValueAsString(request))
                .when()
                .post(FAVORITE_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .header(HttpHeaders.LOCATION);
    }
}
