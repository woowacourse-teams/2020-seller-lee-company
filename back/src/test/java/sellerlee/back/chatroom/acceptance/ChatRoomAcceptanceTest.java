/**
 * @author kouz95
 */

package sellerlee.back.chatroom.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.chatroom.presentation.ChatRoomController.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;

public class ChatRoomAcceptanceTest extends AcceptanceTest {

    /**
     * Feature: 채팅 관리
     * <p>
     * Scenario: 채팅방을 관리한다.
     * <p>
     * Given 게시글이 생성되어 있다.
     * And 멤버가 생성되어 있다.
     * <p>
     * When 채팅방을 만든다.
     * Then 채팅방이 추가되었다.
     * <p>
     * When 특정 게시글에 존재하는 채팅방들을 조회한다.
     * Then 채팅방들이 조회된다.
     */

    @TestFactory
    Stream<DynamicTest> manageChatRoom() throws JsonProcessingException {
        Long articleId = extractId(createArticle());

        return Stream.of(
                dynamicTest("채팅방을 만든다", () -> createChatRoom(articleId)),
                dynamicTest("한 게시글에 생성된 채팅방들을 조회한다", () -> {
                    List<ChatRoomResponse> responses = showAllChatRoomsOfArticle(articleId);
                    assertThat(responses.size()).isEqualTo(1);
                })
        );
    }

    private void createChatRoom(Long articleId) throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(new ChatRoomCreateRequest(articleId,
                MEMBER2.getId()));

        given()
                .body(request)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post(CHAT_ROOM_URI)
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    private List<ChatRoomResponse> showAllChatRoomsOfArticle(Long articleId) {
        return given()
                .when()
                .param("articleId", articleId)
                .get(CHAT_ROOM_URI)
                .then()
                .log().all()
                .extract().jsonPath().getList(".", ChatRoomResponse.class);
    }
}
