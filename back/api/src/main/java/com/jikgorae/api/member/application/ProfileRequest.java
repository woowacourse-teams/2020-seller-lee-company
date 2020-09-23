package com.jikgorae.api.member.application;

public class ProfileRequest {
    private String nickname;
    private String avatar;

    private ProfileRequest() {
    }

    public ProfileRequest(String nickname, String avatar) {
        this.nickname = nickname;
        this.avatar = avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public String getAvatar() {
        return avatar;
    }
}
