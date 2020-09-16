package com.jikgorae.api.security.oauth2.service;

import java.util.Collections;
import java.util.Iterator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;

public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(
            MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        String kakaoId = oAuth2User.getName();
        Iterator<? extends GrantedAuthority> iterator = (oAuth2User.getAuthorities()).iterator();
        String role = null;
        if (iterator.hasNext()) {
            role = iterator.next().getAuthority();
        }
        Member member = memberRepository.findOptionalMemberByKakaoId(kakaoId)
                .orElse(new Member(kakaoId, null, null, role, null));

        memberRepository.save(member);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole())),
                oAuth2User.getAttributes(),
                userNameAttributeName);
    }
}
