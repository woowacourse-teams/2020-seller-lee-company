/**
 * @author kouz95
 */

package sellerlee.back.chatroom.presentation;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.chatroom.presentation.ChatRoomController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Collections;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;
import sellerlee.back.chatroom.application.ChatRoomService;

@WebMvcTest(controllers = ChatRoomController.class)
class ChatRoomControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ChatRoomService chatRoomService;

    @DisplayName("ChatRoom에 post요청시 Status Code는 Created이다.")
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
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @DisplayName("특정 게시글의 채팅방 GET 요청시 Status Code는 OK이다.")
    @Test
    void showChatRoomOfArticle() throws Exception {
        when(chatRoomService.showChatRoomsOf(1L))
                .thenReturn(Collections.singletonList(
                        new ChatRoomResponse(MEMBER1.getAvatar(), MEMBER1.getNickname())));

        mockMvc.perform(get(CHAT_ROOM_URI)
                .param("articleId", "1"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
