package com.jikgorae.api.member.application;

public class LoginRequest {
    private String nickname;
    private String password;

    private LoginRequest() {
    }

    public LoginRequest(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }
}
