package sellerlee.back.chatroom.application;

import org.springframework.stereotype.Service;
import sellerlee.back.chatroom.domain.ChatRoom;
import sellerlee.back.chatroom.domain.ChatRoomRepository;

import java.util.List;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public Long createChatRoom(ChatRoomCreateRequest request) {
        ChatRoom persist = chatRoomRepository.save(request.toChatRoom());
        return persist.getId();
    }

    public List<ChatRoomResponse> showChatRoomsOf(Long articleId) {
        return null;
    }
}
