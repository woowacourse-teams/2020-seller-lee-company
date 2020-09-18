package com.jikgorae.api.member.application;

import com.jikgorae.api.security.web.AuthorizationType;

public class AuthTokenResponse {
    private Long id;
    private String nickname;
    private String avatar;
    private String accessToken;
    private String tokenType;

    private AuthTokenResponse() {
    }

    private AuthTokenResponse(Long id, String nickname, String avatar, String accessToken,
            String tokenType) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public static AuthTokenResponse of(Long id, String nickname, String avatar, String accessToken,
            AuthorizationType type) {
        return new AuthTokenResponse(id, nickname, avatar, accessToken, type.toLowerCase());
    }

    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }
}
