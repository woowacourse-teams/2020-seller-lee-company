package com.jikgorae.api.security.oauth2.service;

import static org.springframework.data.util.Optionals.*;

import java.util.Collections;
import java.util.Iterator;
import java.util.NoSuchElementException;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(
            MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
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

        if (!iterator.hasNext()) {
            throw new NoSuchElementException("no granted authorities");
        }

        String role = iterator.next().getAuthority();
        ifPresentOrElse(memberRepository.findOptionalMemberByKakaoId(kakaoId),
                member -> member.addRole(role),
                () -> memberRepository.save(new Member(kakaoId, null, null, role, null))
        );

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(role)),
                oAuth2User.getAttributes(),
                userNameAttributeName);
    }
}
