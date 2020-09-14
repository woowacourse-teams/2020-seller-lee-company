package com.jikgorae.api.chatroom.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.chatroom.domain.ChatRoom;
import com.jikgorae.api.chatroom.domain.ChatRoomRepository;

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
        when(chatRoomRepository.save(any())).thenReturn(new ChatRoom(1L, ARTICLE1, MEMBER1,
                ARTICLE1.getId()));

        Long chatRoomId = chatRoomService.createChatRoom(new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId()), MEMBER2);
        assertThat(chatRoomId).isEqualTo(1L);
    }

    @DisplayName("특정 게시물의 채팅방들을 조회한다.")
    @Test
    void showChatRoomsOf() {
        when(chatRoomRepository.findChatRoomsByArticleId(ARTICLE1.getId()))
                .thenReturn(Arrays.asList(new ChatRoom(1L, ARTICLE1, MEMBER1, ARTICLE1.getId()), new ChatRoom(2L, ARTICLE1, MEMBER2,
                        ARTICLE1.getId())));

        List<ChatRoomResponse> responses = chatRoomService.showChatRoomsOf(ARTICLE1.getId());

        assertThat(responses.size()).isEqualTo(2);
        assertThat(responses.get(0).getNickname()).isEqualTo(MEMBER1.getNickname());
        assertThat(responses.get(1).getNickname()).isEqualTo(MEMBER2.getNickname());
    }
}
