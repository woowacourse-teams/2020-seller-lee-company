package sellerlee.back.member.application;

import sellerlee.back.member.domain.Member;

public class KakaoProfileRequest {
    private String nickname;
    private String profile_image;

    private KakaoProfileRequest() {
    }

    private KakaoProfileRequest(String nickname, String profile_image) {
        this.nickname = nickname;
        this.profile_image = profile_image;
    }

    public static KakaoProfileRequest of(Member member) {
        return new KakaoProfileRequest(member.getNickname(), member.getAvatar());
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfile_image() {
        return profile_image;
    }
}
