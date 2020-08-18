package sellerlee.back.chatroom.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.chatroom.domain.ChatRoom;
import sellerlee.back.chatroom.domain.ChatRoomRepository;

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
        when(chatRoomRepository.save(any())).thenReturn(new ChatRoom(1L, ARTICLE1, MEMBER1));

        Long chatRoomId = chatRoomService.createChatRoom(new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId()));
        assertThat(chatRoomId).isEqualTo(1L);
    }

    @DisplayName("특정 게시물의 채팅방들을 조회한다.")
    @Test
    void showChatRoomsOf() {
        when(chatRoomRepository.findChatRoomsByArticleId(ARTICLE1.getId()))
                .thenReturn(Arrays.asList(new ChatRoom(1L, ARTICLE1, MEMBER1),
                        new ChatRoom(2L, ARTICLE1, MEMBER2)));

        List<ChatRoomResponse> responses = chatRoomService.showChatRoomsOf(ARTICLE1.getId());

        assertThat(responses.size()).isEqualTo(2);
        assertThat(responses.get(0).getNickname()).isEqualTo(MEMBER1.getNickname());
        assertThat(responses.get(1).getNickname()).isEqualTo(MEMBER2.getNickname());
    }
}
