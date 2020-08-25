package sellerlee.back.member.application;

import org.springframework.security.crypto.password.PasswordEncoder;

import sellerlee.back.member.domain.Member;

public class ProfileRequest {
    private String password;
    private String avatar;

    private ProfileRequest() {
    }

    public ProfileRequest(String password, String avatar) {
        this.password = password;
        this.avatar = avatar;
    }

    public Member toMemberWithPasswordEncode(PasswordEncoder passwordEncoder) {
        return new Member(passwordEncoder.encode(password), avatar);
    }

    public String getPassword() {
        return password;
    }

    public String getAvatar() {
        return avatar;
    }
}
