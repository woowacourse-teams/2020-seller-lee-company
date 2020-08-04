package sellerlee.back.chatroom.presentation;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.chatting.application.ChatRoomService;

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

    @MockBean
    private ChatRoomService chatRoomService;

    @Test
    void createChatting() throws Exception {
        when(chatRoomService.create(ARTICLE1.getId(), MEMBER1.getId()))
                .thenReturn(1L);

        mockMvc.perform(post(CHAT_ROOM_URI)
                .param("articleId", ARTICLE1.getId().toString())
                .param("buyerId", MEMBER1.getId().toString()))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}