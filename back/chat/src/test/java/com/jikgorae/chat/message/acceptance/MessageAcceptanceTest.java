package com.jikgorae.chat.message.acceptance;

import static com.jikgorae.chat.config.WebSockConfig.*;
import static com.jikgorae.chat.message.presentation.MessageController.*;
import static java.util.concurrent.TimeUnit.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jikgorae.chat.message.AcceptanceTest;
import com.jikgorae.chat.message.application.MessageRequest;
import com.jikgorae.chat.message.application.MessageResponse;
import com.jikgorae.chat.message.fixture.MessageFixture;

public class MessageAcceptanceTest extends AcceptanceTest {
    /**
     * Feature: 채팅 메세지 관리
     * <p>
     * Given 채팅 서버와 연결 되어 있다.
     * And 채팅방에 입장한다.
     * <p>
     * When 메세지를 보낸다.
     * Then 메세지를 수신한다.
     * <p>
     */
    @TestFactory
    Stream<DynamicTest> manageMessage() {
        Long roomId = 1L;
        enterChatRoom(roomId);

        return Stream.of(dynamicTest("메세지를 보내면 메세지를 수신한다.", () -> {
            MessageRequest request = MessageFixture.requestOf(roomId);
            sendMessage(request);
            MessageResponse response = objectMapper.readValue(blockingQueue.poll(1, SECONDS),
                    MessageResponse.class);
            assertThat(response.getRoomId()).isEqualTo(request.getRoomId());
            assertThat(response.getSenderId()).isEqualTo(request.getSenderId());
            assertThat(response.getContent()).isEqualTo(request.getMessage());
        }));
    }

    private void enterChatRoom(Long roomId) {
        session.subscribe(DESTINATION + roomId, new DefaultStompFrameHandler());
    }

    private void sendMessage(MessageRequest request) throws JsonProcessingException {
        session.send(PUBLISH + MESSAGE_URI, objectMapper.writeValueAsString(request).getBytes());
    }
}
