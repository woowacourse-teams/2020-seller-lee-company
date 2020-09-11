package com.jikgorae.api.member.application;

import com.jikgorae.api.security.web.AuthorizationType;

public class TokenResponse {
    private String accessToken;
    private String state;
    private String tokenType;

    private TokenResponse() {
    }

    private TokenResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public TokenResponse(String accessToken, String state, String tokenType) {
        this.accessToken = accessToken;
        this.state = state;
        this.tokenType = tokenType;
    }

    public static TokenResponse of(String accessToken, AuthorizationType type) {
        return new TokenResponse(accessToken, type.toLowerCase());
    }

    public static TokenResponse of(String accessToken, String state, AuthorizationType type) {
        return new TokenResponse(accessToken, state, type.toLowerCase());
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getState() {
        return state;
    }

    public String getTokenType() {
        return tokenType;
    }
}
