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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ArticleAcceptanceTest {
    @LocalServerPort
    int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    public static RequestSpecification given() {
        return RestAssured.given().log().all();
    }

    @DisplayName("지하철역을 관리한다")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        /**
         Feature: 게시글 관리

         Scenario: 게시글을 관리한다.
         When 게시글을 등록한다.
         Then 게시글이 추가 되었다.
         */
        return Stream.of(
                DynamicTest.dynamicTest("게시글 추가", () -> {
                    createArticle();
                })
        );
    }

    private void createArticle(){
        Map<String, String> params = new HashMap<>();
        params.put("title", "선풍기");
        params.put("category", "가전제품");
        params.put("price","10000");
        params.put("contents", "진짜 시원합니다");
      //  params.put("images", "");
      //  params.put("tags", "#선풍기");
        given().
                body(params).
                contentType(MediaType.APPLICATION_JSON_VALUE).
                accept(MediaType.APPLICATION_JSON_VALUE).
                when().
                post("/article").
                then().
                log().all().
                statusCode(HttpStatus.CREATED.value());
    }
}