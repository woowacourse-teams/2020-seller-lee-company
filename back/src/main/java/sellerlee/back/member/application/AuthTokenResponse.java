package sellerlee.back.member.application;

import sellerlee.back.security.web.AuthorizationType;

public class AuthTokenResponse {
    private String accessToken;
    private String state;
    private String tokenType;

    private AuthTokenResponse() {
    }

    private AuthTokenResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public AuthTokenResponse(String accessToken, String state, String tokenType) {
        this.accessToken = accessToken;
        this.state = state;
        this.tokenType = tokenType;
    }

    public static AuthTokenResponse of(String accessToken, AuthorizationType type) {
        return new AuthTokenResponse(accessToken, type.toLowerCase());
    }

    public static AuthTokenResponse of(String accessToken, String state, AuthorizationType type) {
        return new AuthTokenResponse(accessToken, state, type.toLowerCase());
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
