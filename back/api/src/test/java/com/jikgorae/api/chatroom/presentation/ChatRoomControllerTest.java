package com.jikgorae.api.chatroom.presentation;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static java.util.Collections.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.chatroom.application.ArticleInfo;
import com.jikgorae.api.chatroom.application.ChatRoomCreateRequest;
import com.jikgorae.api.chatroom.application.ChatRoomService;
import com.jikgorae.api.chatroom.query.ChatRoomDao;
import com.jikgorae.api.chatroom.query.ChatRoomInfo;

@WebMvcTest(controllers = ChatRoomController.class)
class ChatRoomControllerTest extends ControllerTest {
    @MockBean
    private ChatRoomDao chatRoomDao;

    @MockBean
    private ChatRoomService chatRoomService;

    @DisplayName("ChatRoom에 POST 요청시 Status Code는 Created이다.")
    @Test
    void create() throws Exception {
        ChatRoomCreateRequest createRequest = new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId());
        when(chatRoomService.create(any(), any()))
                .thenReturn(1L);

        String request = objectMapper.writeValueAsString(createRequest);

        // @formatter:off
        mockMvc
                .perform(
                        post(ChatRoomController.CHAT_ROOM_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(
                        document("chat/rooms/post",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("articleId").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("sellerId").type(JsonFieldType.NUMBER).description("판매자의 ID")
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("생성된 채팅방의 ID가 담긴 URI")
                                )));
        // @formatter:on
    }

    @DisplayName("로그인한 멤버의 ChatRoom 전체 GET 요청시 Status Code는 OK다.")
    @Test
    void showAll() throws Exception {
        when(chatRoomDao.showAll(any()))
                .thenReturn(singletonList(
                        new ChatRoomInfo(1L, ArticleInfo.of(ARTICLE1), MEMBER1, MEMBER2)));
        // @formatter:off
        mockMvc
                .perform(
                        MockMvcRequestBuilders.get(ChatRoomController.CHAT_ROOM_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(
                        document("chat/rooms/get",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").description("채팅방 ID").type(JsonFieldType.NUMBER),
                                        fieldWithPath("[].articleInfo.id").description("게시글 아이디").type(JsonFieldType.NUMBER),
                                        fieldWithPath("[].articleInfo.title").description("게시글 제목").type(JsonFieldType.STRING),
                                        fieldWithPath("[].articleInfo.price").description("게시글 가격").type(JsonFieldType.NUMBER),
                                        fieldWithPath("[].articleInfo.thumbnail").description("게시글 대표 사진").type(JsonFieldType.STRING),
                                        fieldWithPath("[].articleInfo.tradeState").description("게시글 판매 상태").type(JsonFieldType.STRING),
                                        fieldWithPath("[].opponent.id").description("상대방 아이디").type(JsonFieldType.NUMBER),
                                        fieldWithPath("[].opponent.nickname").description("상대방 닉네임").type(JsonFieldType.STRING),
                                        fieldWithPath("[].opponent.avatar").description("상대방 아바타 이미지 url").type(JsonFieldType.STRING)
                                )));
        // @formatter:on
    }

    @DisplayName("ChatRoom 전체 DELETE 요청시 Status Code는 NO-CONTENT다.")
    @Test
    void delete() throws Exception {
        Long roomId = 1L;

        // @formatter:off
        mockMvc
                .perform(
                        MockMvcRequestBuilders.delete(ChatRoomController.CHAT_ROOM_API_URI + "/" + roomId)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(
                        document("chat/rooms/delete",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                )));
        // @formatter:on
        verify(chatRoomService).delete(roomId);
    }
}
