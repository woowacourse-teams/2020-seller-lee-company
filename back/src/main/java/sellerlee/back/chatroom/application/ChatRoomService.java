package sellerlee.back.chatroom.application;

import java.util.List;

import org.springframework.stereotype.Service;

import sellerlee.back.chatroom.domain.ChatRoom;
import sellerlee.back.chatroom.domain.ChatRoomRepository;

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
        List<ChatRoom> responses = chatRoomRepository.findChatRoomsByArticleId(
                articleId);
        return ChatRoomResponse.listOf(responses);
    }
}
