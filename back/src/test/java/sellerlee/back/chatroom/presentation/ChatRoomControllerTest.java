/**
 * @author kouz95
 */

package sellerlee.back.chatroom.presentation;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.chatroom.presentation.ChatRoomController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;
import sellerlee.back.chatroom.application.ChatRoomService;

@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(controllers = ChatRoomController.class)
class ChatRoomControllerTest {
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ChatRoomService chatRoomService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp(WebApplicationContext context, RestDocumentationContextProvider restDocumentation) {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(print())
                .build();
    }

    @DisplayName("ChatRoom에 POST 요청시 Status Code는 Created이다.")
    @Test
    void createChatRoom() throws Exception {
        ChatRoomCreateRequest createRequest = new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId());
        when(chatRoomService.createChatRoom(any()))
                .thenReturn(1L);

        String request = objectMapper.writeValueAsString(createRequest);

        mockMvc.perform(post(CHAT_ROOM_URI)
                .content(request)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(document("chat-rooms/post",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        // requestHeaders(
                        //         headerWithName("Authorization").description("회원의 토큰")
                        // ),
                        requestFields(
                                fieldWithPath("articleId").type(JsonFieldType.NUMBER)
                                        .description("게시글의 ID"),
                                fieldWithPath("buyerId").type(JsonFieldType.NUMBER)
                                        .description("구매자(채팅 생성자)의 ID")
                        ),
                        responseHeaders(
                                headerWithName("Location").description("생성된 채팅방의 ID가 담긴 URI")
                        )
                ));
    }

    @DisplayName("특정 게시글의 채팅방 GET 요청시 Status Code는 OK이다.")
    @Test
    void showChatRoomOfArticle() throws Exception {
        when(chatRoomService.showChatRoomsOf(1L))
                .thenReturn(Collections.singletonList(
                        new ChatRoomResponse(MEMBER1.getAvatar(), MEMBER1.getNickname())));

        mockMvc.perform(get(CHAT_ROOM_URI)
                .param("articleId", "1"))
                .andExpect(status().isOk())
                .andDo(document("chat-rooms/",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        // requestHeaders(
                        //         headerWithName("Authorization").description("회원의 토큰")
                        // ),
                        requestParameters(
                                parameterWithName("articleId").description("게시글의 ID")
                        )
                ));
    }
}
