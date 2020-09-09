package sellerlee.back.security.oauth2.provider;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

public enum CustomOAuth2Provider {
    KAKAO {
        @Override
        public ClientRegistration.Builder getBuilder(String registrationId) {
            ClientRegistration.Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.POST, DEFAULT_LOGIN_REDIRECT_URL)
                    .scope("profile")
                    .authorizationUri(AUTHORIZATION_URI)
                    .tokenUri(TOKEN_URI)
                    .userInfoUri(USER_INFO_URI)
                    .userNameAttributeName("id")
                    .clientName("Kakao");

            return builder;
        }
    };
    private static final String BASE_URL = "http://localhost:8080";
    // private static final String BASE_URL = "http://15.164.125.244:8080";
    private static final String DEFAULT_LOGIN_REDIRECT_URL = BASE_URL + "/login/oauth2/code/kakao";
    public static final String AUTHORIZATION_URI = "https://kauth.kakao.com/oauth/authorize";
    public static final String TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    public static final String USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
    public static final String UPDATE_PROFILE_URI = "https://kapi.kakao.com/v1/user/update_profile";

    protected final ClientRegistration.Builder getBuilder(
            String registrationId, ClientAuthenticationMethod method, String redirectUrl) {
        ClientRegistration.Builder builder =
                ClientRegistration.withRegistrationId(registrationId)
                        .clientAuthenticationMethod(method)
                        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                        .redirectUriTemplate(redirectUrl);

        return builder;
    }

    public abstract ClientRegistration.Builder getBuilder(String registrationId);
}