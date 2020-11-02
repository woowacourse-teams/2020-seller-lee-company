package com.jikgorae.api.chatroom.acceptance;

import static com.jikgorae.api.chatroom.presentation.ChatRoomController.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.http.HttpHeaders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.chatroom.application.ChatRoomCreateRequest;
import com.jikgorae.api.chatroom.application.ChatRoomResponse;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class ChatRoomAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;

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
        token = joinAndLogin(MEMBER2);
        OrganizationResponse organization = createOrganization(token, 배달의민족_요청);
        Long articleId = extractId(createArticle(token, organization));

        Long chatRoomId = extractId(createChatRoom(articleId));

        return Stream.of(
                dynamicTest("로그인한 유저가 속한 채팅방을 조회한다.", () -> {
                    List<ChatRoomResponse> response = showAllChatRoom();
                    assertThat(response.size()).isEqualTo(1);
                    assertThat(response.get(0).getArticleInfo().getId()).isEqualTo(articleId);
                }),
                dynamicTest("채팅방을 삭제한다.", () -> {
                    deleteChatRoom(chatRoomId);
                    assertThat(showAllChatRoom().size()).isEqualTo(0);
                })
        );
    }

    private String createChatRoom(Long articleId) throws Exception {
        String request = objectMapper.writeValueAsString(new ChatRoomCreateRequest(articleId, 1L));

        return mockMvc.perform(
                MockMvcRequestBuilders.post(CHAT_ROOM_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getHeader(LOCATION);
    }

    private List<ChatRoomResponse> showAllChatRoom() throws Exception {
        String content = mockMvc.perform(MockMvcRequestBuilders.get(CHAT_ROOM_API_URI)
                .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                        token.getAccessToken()))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readValue(content, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, ChatRoomResponse.class));
    }

    private void deleteChatRoom(Long chatRoomId) throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete(CHAT_ROOM_API_URI + "/" + chatRoomId)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken())))
                .andExpect(status().isNoContent());
    }
}
