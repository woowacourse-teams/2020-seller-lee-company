package com.jikgorae.api.chatroom.presentation;

import static com.jikgorae.api.chatroom.presentation.ChatRoomController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.chatroom.application.ChatRoomCreateRequest;
import com.jikgorae.api.chatroom.application.ChatRoomResponse;
import com.jikgorae.api.chatroom.application.ChatRoomService;
import com.jikgorae.api.chatroom.query.ChatRoomDao;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(CHAT_ROOM_API_URI)
public class ChatRoomController {
    public static final String CHAT_ROOM_API_URI = "/api/chat/rooms";

    private final ChatRoomService chatRoomService;
    private final ChatRoomDao chatRoomDao;

    public ChatRoomController(ChatRoomService chatRoomService,
            ChatRoomDao chatRoomDao) {
        this.chatRoomService = chatRoomService;
        this.chatRoomDao = chatRoomDao;
    }

    @PostMapping
    public ResponseEntity<Void> createChatRoom(@RequestBody ChatRoomCreateRequest request, @LoginMember Member buyer) {
        Long chatRoomId = chatRoomService.createChatRoom(request, buyer);

        return ResponseEntity
                .created(URI.create(CHAT_ROOM_API_URI + "/" + chatRoomId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<ChatRoomResponse>> showAllChatRoom(@LoginMember Member member) {
        List<ChatRoomResponse> responses = ChatRoomResponse.listOf(chatRoomDao.showAll(member), member);

        return ResponseEntity.ok(responses);
    }
}
