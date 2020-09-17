package com.jikgorae.api.member.application;

import com.jikgorae.api.security.web.AuthorizationType;

public class AuthTokenResponse {
    private String nickname;
    private String accessToken;
    private String tokenType;

    private AuthTokenResponse() {
    }

    private AuthTokenResponse(String nickname, String accessToken, String tokenType) {
        this.nickname = nickname;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public static AuthTokenResponse of(String nickname, String accessToken, AuthorizationType type) {
        return new AuthTokenResponse(nickname, accessToken, type.toLowerCase());
    }

    public String getNickname() {
        return nickname;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }
}
