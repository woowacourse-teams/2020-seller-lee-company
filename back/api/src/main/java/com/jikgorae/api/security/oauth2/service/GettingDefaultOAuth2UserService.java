package com.jikgorae.api.security.oauth2.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class GettingDefaultOAuth2UserService {
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService;

    public GettingDefaultOAuth2UserService() {
        this.oAuth2UserService = new DefaultOAuth2UserService();
    }

    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        return oAuth2UserService.loadUser(userRequest);
    }
}
