package sellerlee.back.chatroom.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE1;
import static sellerlee.back.article.fixture.MemberFixture.MEMBER1;
import static sellerlee.back.chatroom.presentation.ChatRoomController.CHAT_ROOM_URI;

@WebMvcTest(controllers = ChatRoomController.class)
class ChatRoomControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

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
}
