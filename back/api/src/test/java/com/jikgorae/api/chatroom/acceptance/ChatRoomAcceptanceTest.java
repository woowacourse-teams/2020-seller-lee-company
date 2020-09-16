package com.jikgorae.api.chatroom.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.chatroom.application.ChatRoomCreateRequest;
import com.jikgorae.api.chatroom.presentation.ChatRoomController;
import com.jikgorae.api.member.application.TokenResponse;
import com.jikgorae.api.security.web.AuthorizationType;

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
    Stream<DynamicTest> manageChatRoom() throws Exception {
        token = joinAndLogin(MEMBER1);
        Long articleId = extractId(createArticle(token));

        return Stream.of(
                dynamicTest("채팅방을 만든다", () -> createChatRoom(articleId))
        );
    }

    private void createChatRoom(Long articleId) throws Exception {
        String request = objectMapper.writeValueAsString(new ChatRoomCreateRequest(articleId, 1L));

        mockMvc.perform(
                post(ChatRoomController.CHAT_ROOM_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isCreated());
    }
}
