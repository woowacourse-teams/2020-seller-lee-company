package com.jikgorae.api.member.application;

import com.jikgorae.api.member.domain.Member;

public class KakaoPropertiesRequest {
    private String nickname;
    private String profile_image;

    private KakaoPropertiesRequest() {
    }

    private KakaoPropertiesRequest(String nickname, String profile_image) {
        this.nickname = nickname;
        this.profile_image = profile_image;
    }

    public static KakaoPropertiesRequest of(Member member) {
        return new KakaoPropertiesRequest(member.getNickname(), member.getAvatar());
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfile_image() {
        return profile_image;
    }
}
