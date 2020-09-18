package com.jikgorae.api.chatroom.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

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
    void create() {
        when(chatRoomRepository.save(any())).thenReturn(new ChatRoom(1L, ARTICLE1, MEMBER1,
                ARTICLE1.getId()));

        Long chatRoomId = chatRoomService.create(new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId()), MEMBER2);
        assertThat(chatRoomId).isEqualTo(1L);
    }

    @DisplayName("이미 채팅방이 존재한다면 해당 채팅방의 Id를 반환한다.")
    @Test
    void createWhenExist() {
        when(chatRoomRepository.findOptionalByArticleIdAndSellerIdAndBuyerId(ARTICLE1.getId(),
                MEMBER1.getId(), MEMBER2.getId())).thenReturn(
                Optional.of(new ChatRoom(1L, ARTICLE1, MEMBER1,
                        ARTICLE1.getId())));

        Long chatRoomId = chatRoomService.create(new ChatRoomCreateRequest(ARTICLE1.getId(),
                MEMBER1.getId()), MEMBER2);
        assertThat(chatRoomId).isEqualTo(1L);
    }

    @DisplayName("채팅방을 삭제한다.")
    @Test
    void delete() {
        Long chatRoomId = 1L;
        chatRoomService.delete(chatRoomId);
        verify(chatRoomRepository).deleteById(chatRoomId);
    }
}
