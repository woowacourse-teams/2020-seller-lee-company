package sellerlee.back.chatroom.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.chatroom.domain.ChatRoom;
import sellerlee.back.chatroom.domain.ChatRoomRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE1;
import static sellerlee.back.article.fixture.MemberFixture.MEMBER1;

@ExtendWith(value = MockitoExtension.class)
class ChatRoomServiceTest {
    @Mock
    private ChatRoomRepository chatRoomRepository;

    private ChatRoomService chatRoomService;

    @BeforeEach
    void setUp() {
        chatRoomService = new ChatRoomService(chatRoomRepository);
    }

    @DisplayName("채팅방 생성시 Id가 생성된다.")
    @Test
    void createChatRoom() {
        when(chatRoomRepository.save(any()))
                .thenReturn(new ChatRoom(1L, ARTICLE1, MEMBER1));

        Long chatRoomId = chatRoomService.createChatRoom(new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId()));
        assertThat(chatRoomId).isEqualTo(1L);

    }
}
