package com.jikgorae.api.security.oauth2.service;

import java.util.Iterator;
import java.util.LinkedHashMap;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.member.domain.State;

@Service
public class CustomOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {

    private final MemberRepository memberRepository;

    public CustomOAuth2AuthorizedClientService(
            MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void saveAuthorizedClient(OAuth2AuthorizedClient oAuth2AuthorizedClient,
            Authentication authentication) {
        // String providerType = oAuth2AuthorizedClient.getClientRegistration().getRegistrationId();
        String kakaoId = oAuth2AuthorizedClient.getPrincipalName();
        OAuth2AccessToken accessToken = oAuth2AuthorizedClient.getAccessToken();
        OAuth2RefreshToken refreshToken = oAuth2AuthorizedClient.getRefreshToken();

        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        Iterator<? extends GrantedAuthority> iterator = (oauth2User.getAuthorities()).iterator();
        String role = null;
        if (iterator.hasNext()) {
            role = iterator.next().getAuthority();
        }
        String nickName = (String)((LinkedHashMap)oauth2User.getAttribute("properties")).get(
                "nickname");
        String avatar = (String)((LinkedHashMap)oauth2User.getAttribute("properties")).get(
                "profile_image");

        assert refreshToken != null;
        Member member = memberRepository.findOptionalMemberByKakaoId(kakaoId)
                .map(entity -> entity.login(nickName, avatar, accessToken.getTokenValue(),
                        refreshToken.getTokenValue()))
                .orElse(
                        new Member(kakaoId, null, null, accessToken.getTokenValue(),
                                refreshToken.getTokenValue(), role, State.NOT_JOIN, null)
                );

        memberRepository.save(member);
    }

    @Override
    public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String clientRegistrationId,
            String principal) {
        return null;
    }

    @Override
    public void removeAuthorizedClient(String s, String s1) {
    }
}