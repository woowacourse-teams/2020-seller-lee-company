package sellerlee.back.member.application;

public class MemberRequest {
    private final String email;
    private final String password;
    private final String avatar;
    private final String nickname;

    public MemberRequest(String email, String password, String avatar, String nickname) {
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }
}
