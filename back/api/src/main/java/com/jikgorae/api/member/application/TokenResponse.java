package com.jikgorae.api.member.application;

import com.jikgorae.api.security.web.AuthorizationType;

public class TokenResponse {
    private Long id;
    private String nickname;
    private String accessToken;
    private String tokenType;

    private TokenResponse() {
    }

    private TokenResponse(Long id, String nickname, String accessToken, String tokenType) {
        this.id = id;
        this.nickname = nickname;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public static TokenResponse of(Long id, String nickname, String accessToken, AuthorizationType type) {
        return new TokenResponse(id, nickname, accessToken, type.toLowerCase());
    }

    public Long getId() {
        return id;
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
