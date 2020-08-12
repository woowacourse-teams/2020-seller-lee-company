package sellerlee.back.member.application;

import sellerlee.back.member.domain.Member;

public class MemberRequest {
    private String email;
    private String password;
    private String avatar;
    private String nickname;

    private MemberRequest() {
    }

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

    public Member toMember() {
        return new Member(email, password, avatar, nickname);
    }
}
