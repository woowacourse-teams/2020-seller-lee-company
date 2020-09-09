package sellerlee.back.chatroom.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.chatroom.presentation.ChatRoomController.*;
import static sellerlee.back.common.PageController.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import sellerlee.back.AcceptanceTest;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.security.web.AuthorizationType;

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
    @WithMockUser
    Stream<DynamicTest> manageChatRoom() throws Exception {
        token = joinAndLogin(MEMBER1);
        Long articleId = extractId(createArticle(token));

        return Stream.of(
                dynamicTest("채팅방을 만든다", () -> createChatRoom(articleId)),
                dynamicTest("한 게시글에 생성된 채팅방들을 조회한다", () -> {
                    List<ChatRoomResponse> responses = showAllChatRoomsOfArticle(articleId);
                    assertThat(responses.size()).isEqualTo(1);
                })
        );
    }

    private void createChatRoom(Long articleId) throws Exception {
        String request = objectMapper.writeValueAsString(new ChatRoomCreateRequest(articleId, 1L));

        mockMvc.perform(
                post(API_URI + CHAT_ROOM_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andDo(print())
                .andExpect(status().isCreated());

        // @formatter:off
        // given()
        //         .auth().oauth2(token.getAccessToken())
        //         .contentType(MediaType.APPLICATION_JSON_VALUE)
        //         .body(request)
        // .when()
        //         .post(API_URI+CHAT_ROOM_URI)
        // .then()
        //         .log().all()
        //         .statusCode(HttpStatus.CREATED.value());
        // @formatter:on
    }

    private List<ChatRoomResponse> showAllChatRoomsOfArticle(Long articleId) throws Exception {

        MvcResult mvcResult = mockMvc.perform(
                get(API_URI + CHAT_ROOM_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("articleId", String.valueOf(articleId)))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, ChatRoomResponse.class));

        // @formatter:off
        // return
        //         given()
        //                 .auth().oauth2(token.getAccessToken())
        //         .when()
        //                 .param("articleId", articleId)
        //                 .get(API_URI+CHAT_ROOM_URI)
        //         .then()
        //                 .log().all()
        //                 .extract()
        //                 .jsonPath().getList(".", ChatRoomResponse.class);
        // @formatter:on
    }
}
