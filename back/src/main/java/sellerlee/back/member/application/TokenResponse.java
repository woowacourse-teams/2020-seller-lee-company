package sellerlee.back.member.application;

import sellerlee.back.security.web.AuthorizationType;

public class TokenResponse {
    private String accessToken;
    private String tokenType;

    private TokenResponse() {
    }

    private TokenResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public static TokenResponse of(String accessToken, AuthorizationType type) {
        return new TokenResponse(accessToken, type.toLowerCase());
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }
}
