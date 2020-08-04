package sellerlee.back.chatroom.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sellerlee.back.chatting.application.ChatRoomService;

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
    public ResponseEntity<Void> createChatRoom(
            @RequestParam Long articleId,
            @RequestParam Long buyerId) {
        Long chatRoomId = chatRoomService.create(articleId, buyerId);
        return ResponseEntity.created(URI.create(CHAT_ROOM_URI + "/" + chatRoomId)).build();
    }
}
