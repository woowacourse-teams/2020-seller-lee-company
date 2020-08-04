/**
 * @author kouz95
 */

package sellerlee.back.chatroom.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import sellerlee.back.chatroom.domain.ChatRoom;

public class ChatRoomResponse {
    private String avatar;
    private String nickname;
    // TODO: 2020/08/04 마지막 메세지 추가

    private ChatRoomResponse() {
    }

    public ChatRoomResponse(String avatar, String nickname) {
        this.avatar = avatar;
        this.nickname = nickname;
    }

    public static List<ChatRoomResponse> listOf(List<ChatRoom> chatRooms) {
        return chatRooms.stream()
                .map(chatRoom -> new ChatRoomResponse(
                        chatRoom.getBuyer().getAvatar(),
                        chatRoom.getBuyer().getNickname()
                ))
                .collect(toList());
    }

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }
}
