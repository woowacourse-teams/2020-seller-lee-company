package com.jikgorae.api.security.oauth2.service;

import static org.springframework.data.util.Optionals.*;

import java.util.Iterator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final GettingDefaultOAuth2UserService gettingDefaultOAuth2UserService;

    public CustomOAuth2UserService(
            MemberRepository memberRepository,
            GettingDefaultOAuth2UserService gettingDefaultOAuth2UserService) {
        this.memberRepository = memberRepository;
        this.gettingDefaultOAuth2UserService = gettingDefaultOAuth2UserService;
    }

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = gettingDefaultOAuth2UserService.loadUser(userRequest);

        String kakaoId = oAuth2User.getName();
        Iterator<? extends GrantedAuthority> iterator = (oAuth2User.getAuthorities()).iterator();

        String role = iterator.next().getAuthority();
        ifPresentOrElse(memberRepository.findOptionalMemberByKakaoId(kakaoId),
                member -> member.addRole(role),
                () -> memberRepository.save(new Member(kakaoId, null, null, role, null, null))
        );

        return oAuth2User;
    }
}
