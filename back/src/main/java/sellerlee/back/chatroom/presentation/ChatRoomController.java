/**
 * @author kouz95
 */

package sellerlee.back.chatroom.presentation;

import static sellerlee.back.chatroom.presentation.ChatRoomController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.chatroom.application.ChatRoomCreateRequest;
import sellerlee.back.chatroom.application.ChatRoomResponse;
import sellerlee.back.chatroom.application.ChatRoomService;

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

        return ResponseEntity
                .created(URI.create(CHAT_ROOM_URI + "/" + chatRoomId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<ChatRoomResponse>> showAllChatRoomOfArticle(
            @RequestParam Long articleId) {
        List<ChatRoomResponse> responses = chatRoomService
                .showChatRoomsOf(articleId);

        return ResponseEntity
                .ok(responses);
    }
}
