package sellerlee.back.member.application;

import sellerlee.back.security.web.AuthorizationType;

public class TokenResponse {
    private String accessToken;
    private int httpStatus;
    private String tokenType;

    private TokenResponse() {
    }

    private TokenResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public TokenResponse(String accessToken, int httpStatus, String tokenType) {
        this.accessToken = accessToken;
        this.httpStatus = httpStatus;
        this.tokenType = tokenType;
    }

    public static TokenResponse of(String accessToken, AuthorizationType type) {
        return new TokenResponse(accessToken, type.toLowerCase());
    }

    public static TokenResponse of(String accessToken, int httpStatus, AuthorizationType type) {
        return new TokenResponse(accessToken, httpStatus, type.toLowerCase());
    }

    public String getAccessToken() {
        return accessToken;
    }

    public int getHttpStatus() {
        return httpStatus;
    }

    public String getTokenType() {
        return tokenType;
    }
}
