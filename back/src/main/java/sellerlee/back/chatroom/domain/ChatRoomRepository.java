/**
 * @author kouz95
 */

package sellerlee.back.chatroom.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findChatRoomsByArticleId(Long articleId);
}
