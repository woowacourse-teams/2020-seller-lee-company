/**
 * @author kouz95
 */

package sellerlee.back.chatroom.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findChatRoomsByArticleId(Long articleId);
}
