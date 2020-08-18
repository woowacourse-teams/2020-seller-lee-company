package sellerlee.back;

import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;

@Sql({"/truncate.sql"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    private static final int ID_INDEX_OF_LOCATION = 2;
    private static final String DELIMITER = "/";

    @Autowired
    protected ObjectMapper objectMapper;

    @LocalServerPort
    private int port;

    protected static RequestSpecification given() {
        return RestAssured
                .given()
                .log().all();
    }

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    protected Long extractId(String location) {
        String id = location.split(DELIMITER)[ID_INDEX_OF_LOCATION];
        return Long.parseLong(id);
    }

    protected String createArticle() throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST);

        // @formatter:off
        return
                given()
                        .body(request)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                        .post(ARTICLE_URI)
                .then()
                        .log().all()
                        .statusCode(HttpStatus.CREATED.value())
                        .extract().header(HttpHeaders.LOCATION);
        // @formatter:on
    }
}
