package sellerlee.back.chatroom.acceptance;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import sellerlee.back.chatroom.application.ChatRoomResponse;

import java.util.List;
import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import static sellerlee.back.chatroom.presentation.ChatRoomController.CHAT_ROOM_URI;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatRoomAcceptanceTest {
    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    /**
     * Feature: 채팅 관리
     * <p>
     * Scenario: 채팅방을 관리한다.
     * <p>
     * When 채팅방을 만든다.
     * Then 채팅방이 추가되었다.
     * <p>
     * When 특정 게시글에 존재하는 채팅방들을 조회한다.
     * Then 채팅방들이 조회된다.
     */

    @DisplayName("채팅방을 관리한다")
    @TestFactory
    Stream<DynamicTest> manageArticle() {
        return Stream.of(
                dynamicTest("채팅방을 만든다", this::createChatRoom),
                dynamicTest("한 게시글에 생성된 채팅방들을 조회한다", () -> {
                    List<ChatRoomResponse> responses = showAllChatRoomsOfArticle();
                    assertThat(responses.size()).isEqualTo(1);
                })
        );
    }

    private List<ChatRoomResponse> showAllChatRoomsOfArticle() {
        return given()
                .log().all()
                .when()
                .param("articleId", 1L)
                .get(CHAT_ROOM_URI)
                .then()
                .log().all()
                .extract().jsonPath().getList(".", ChatRoomResponse.class);

    }

    private void createChatRoom() {
        given()
                .log().all()
                .when()
                .post(CHAT_ROOM_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
    }
}
