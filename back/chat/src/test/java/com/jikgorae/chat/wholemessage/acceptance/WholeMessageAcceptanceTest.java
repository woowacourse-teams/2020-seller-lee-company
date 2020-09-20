package com.jikgorae.chat.wholemessage.acceptance;

import static com.jikgorae.chat.config.WebSockConfig.*;
import static com.jikgorae.chat.wholeMessage.presentation.WholeMessageController.*;
import static java.util.concurrent.TimeUnit.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jikgorae.chat.AcceptanceTest;
import com.jikgorae.chat.wholeMessage.application.WholeMessageRequest;
import com.jikgorae.chat.wholeMessage.application.WholeMessageResponse;
import com.jikgorae.chat.wholemessage.fixture.WholeMessageFixture;

public class WholeMessageAcceptanceTest extends AcceptanceTest {
    /**
     * Feature: 전체 채팅 메세지 관리
     * <p>
     * Given 채팅 서버와 연결 되어 있다.
     * And 전체 채팅방에 입장한다.
     * <p>
     * When 메세지를 보낸다.
     * Then 메세지를 수신한다.
     * <p>
     * When 특정 시간 이전의 메세지를 사이즈 함께 요청한다.
     * Then 특정 시간 이전의 메세지를 사이즈만큼 수신한다.
     */
    @TestFactory
    Stream<DynamicTest> manageWholeMessage() {
        Long roomId = 1L;
        enterWholeChatRoom(roomId);
        WholeMessageRequest request = WholeMessageFixture.requestOf(roomId);

        return Stream.of(dynamicTest("메세지를 보내면 메세지를 수신한다.", () -> {
                    sendMessage(request);
                    sendMessage(request);
                    WholeMessageResponse response = objectMapper.readValue(blockingQueue.poll(1, SECONDS),
                            WholeMessageResponse.class);
                    assertThat(response.getId()).isNotNull();
                    assertThat(response.getRoomId()).isEqualTo(request.getRoomId());
                    assertThat(response.getSenderId()).isEqualTo(request.getSenderId());
                    assertThat(response.getSenderAvatar()).isEqualTo(request.getSenderAvatar());
                    assertThat(response.getContent()).isEqualTo(request.getMessage());
                }),
                dynamicTest("특정 시간 이전의 메세지를 사이즈만큼 수신한다.", () -> {
                    int size = 1;
                    String lastMessageDate = LocalDateTime.now().toString();

                    List<WholeMessageResponse> response = showAllMessages(roomId, size,
                            lastMessageDate);
                    assertThat(response.size()).isEqualTo(1);
                    assertThat(response.get(0).getId()).isNotNull();
                    assertThat(response.get(0).getRoomId()).isEqualTo(request.getRoomId());
                    assertThat(response.get(0).getSenderId()).isEqualTo(request.getSenderId());
                    assertThat(response.get(0).getSenderAvatar()).isEqualTo(
                            request.getSenderAvatar());
                    assertThat(response.get(0).getContent()).isEqualTo(request.getMessage());
                }));
    }

    private void enterWholeChatRoom(Long roomId) {
        session.subscribe(DESTINATION_OF_ORGANIZATION + roomId,
                new AcceptanceTest.DefaultStompFrameHandler());
    }

    private void sendMessage(WholeMessageRequest request) throws JsonProcessingException {
        session.send(PUBLISH + WHOLE_MESSAGE_URI,
                objectMapper.writeValueAsString(request).getBytes());
    }

    private List<WholeMessageResponse> showAllMessages(Long roomId, int size,
            String lastMessageDate) {
        return given()
                .param("size", size)
                .param("lastMessageDate", lastMessageDate)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get(WHOLE_MESSAGE_REST_URI, roomId)
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getList(".", WholeMessageResponse.class);
    }
}
