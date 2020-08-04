package sellerlee.back.chatroom.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomService;

import java.net.URI;

import static sellerlee.back.chatroom.presentation.ChatRoomController.CHAT_ROOM_URI;

@RestController
@RequestMapping(CHAT_ROOM_URI)
public class ChatRoomController {
    public static final String CHAT_ROOM_URI = "/chat-rooms";

    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @PostMapping
    public ResponseEntity<Void> createChatRoom(@RequestBody ChatRoomCreateRequest request) {
        Long chatRoomId = chatRoomService.createChatRoom(request);
        return ResponseEntity.created(URI.create(CHAT_ROOM_URI + "/" + chatRoomId)).build();
    }
}
