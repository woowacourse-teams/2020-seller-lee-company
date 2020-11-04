package com.jikgorae.api.security.oauth2.provider;

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
                    .clientName("kakao");

            return builder;
        }
    };

    public static final String AUTHORIZATION_URI = "https://kauth.kakao.com/oauth/authorize";
    private static final String DEPLOY_SERVER = "https://sellerlee.tk";
    // private static final String QA_SERVER = "http://192.168.4.179:8080";
    public static final String TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    public static final String USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
    public static final String UPDATE_PROFILE_URI = "https://kapi.kakao.com/v1/user/update_profile";
    //private static final String LOCAL_SERVER = "http://localhost:8080";
    private static final String BASE_URL = DEPLOY_SERVER;
    private static final String DEFAULT_LOGIN_REDIRECT_URL = BASE_URL + "/login/oauth2/code/kakao";

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
