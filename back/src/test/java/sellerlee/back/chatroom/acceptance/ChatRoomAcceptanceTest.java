package sellerlee.back.chatroom.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static sellerlee.back.chatroom.presentation.ChatRoomController.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.AcceptanceTest;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;
import sellerlee.back.member.application.TokenResponse;

public class ChatRoomAcceptanceTest extends AcceptanceTest {
    private TokenResponse token;

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
    @DisplayName("채팅방 관리")
    @TestFactory
    Stream<DynamicTest> manageChatRoom() throws JsonProcessingException {
        token = joinMemberAndLogin();
        Long articleId = extractId(createArticle(token));

        return Stream.of(
                dynamicTest("채팅방을 만든다", () -> createChatRoom(articleId)),
                dynamicTest("한 게시글에 생성된 채팅방들을 조회한다", () -> {
                    List<ChatRoomResponse> responses = showAllChatRoomsOfArticle(articleId);
                    assertThat(responses.size()).isEqualTo(1);
                })
        );
    }

    private void createChatRoom(Long articleId) throws JsonProcessingException {
        String request = objectMapper.writeValueAsString(new ChatRoomCreateRequest(articleId, 1L));

        // @formatter:off
        given()
                .auth().oauth2(token.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
        .when()
                .post(CHAT_ROOM_URI)
        .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value());
        // @formatter:on
    }

    private List<ChatRoomResponse> showAllChatRoomsOfArticle(Long articleId) {
        // @formatter:off
        return
                given()
                        .auth().oauth2(token.getAccessToken())
                .when()
                        .param("articleId", articleId)
                        .get(CHAT_ROOM_URI)
                .then()
                        .log().all()
                        .extract()
                        .jsonPath().getList(".", ChatRoomResponse.class);
        // @formatter:on
    }
}
