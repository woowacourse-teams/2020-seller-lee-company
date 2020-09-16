package sellerlee.back.member.application;

public class kakaoTokenResponse {
    private String token_type;
    private String access_token;
    private String expires_in;
    private String refresh_token;
    private String refresh_token_expires_in;

    private kakaoTokenResponse() {
    }

    public kakaoTokenResponse(String token_type, String access_token, String expires_in,
            String refresh_token, String refresh_token_expires_in) {
        this.token_type = token_type;
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.refresh_token = refresh_token;
        this.refresh_token_expires_in = refresh_token_expires_in;
    }

    public String getToken_type() {
        return token_type;
    }

    public String getAccess_token() {
        return access_token;
    }

    public String getExpires_in() {
        return expires_in;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public String getRefresh_token_expires_in() {
        return refresh_token_expires_in;
    }
}
