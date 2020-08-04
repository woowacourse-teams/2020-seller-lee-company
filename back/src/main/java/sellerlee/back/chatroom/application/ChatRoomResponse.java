package sellerlee.back.chatroom.application;

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

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }
}
