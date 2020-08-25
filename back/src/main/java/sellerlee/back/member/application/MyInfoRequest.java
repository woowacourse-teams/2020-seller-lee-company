package sellerlee.back.member.application;

import org.springframework.security.crypto.password.PasswordEncoder;

import sellerlee.back.member.domain.Member;

public class MyInfoRequest {
    private String nickname;
    private String password;
    private String avatar;

    private MyInfoRequest() {
    }

    public MyInfoRequest(String nickname, String password, String avatar) {
        this.nickname = nickname;
        this.password = password;
        this.avatar = avatar;
    }

    public Member toMemberWithPasswordEncode(PasswordEncoder passwordEncoder) {
        return new Member(nickname, passwordEncoder.encode(password), avatar);
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

    public String getAvatar() {
        return avatar;
    }
}
