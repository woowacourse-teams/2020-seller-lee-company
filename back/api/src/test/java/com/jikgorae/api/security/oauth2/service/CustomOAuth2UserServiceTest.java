package com.jikgorae.api.security.oauth2.service;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;

@ExtendWith(value = MockitoExtension.class)
class CustomOAuth2UserServiceTest {
    private static final String ROLE = "ROLE_USER";
    private static final String USER_NAME_ATTRIBUTE = "id";

    @Mock
    private MemberRepository memberRepository;
    @Mock
    private OAuth2UserRequest oAuth2UserRequest;
    @Mock
    private GettingDefaultOAuth2UserService gettingDefaultOAuth2UserService;

    private CustomOAuth2UserService customOAuth2UserService;

    private OAuth2User oAuth2User;

    private Map<String, Object> attribute;

    @BeforeEach
    void setUp() {
        customOAuth2UserService = new CustomOAuth2UserService(memberRepository,
                gettingDefaultOAuth2UserService);
        attribute = new HashMap<>();
        attribute.put(USER_NAME_ATTRIBUTE, "51L");
        oAuth2User = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(ROLE)),
                attribute,
                USER_NAME_ATTRIBUTE
        );

    }

    @Test
    void loadUserTest() {
        when(gettingDefaultOAuth2UserService.loadUser(oAuth2UserRequest)).thenReturn(oAuth2User);
        when(memberRepository.findOptionalMemberByKakaoId(any())).thenReturn(Optional.of(MEMBER1));

        OAuth2User authenticatedUser = customOAuth2UserService.loadUser(oAuth2UserRequest);

        assertAll(
                () -> assertThat(authenticatedUser.getName()).isEqualTo("51L"),
                () -> assertThat(authenticatedUser.getAttributes()).containsExactlyEntriesOf(
                        attribute),
                () -> assertThat(authenticatedUser.getAuthorities()).allMatch(
                        grantedAuthority -> grantedAuthority.getAuthority().equals(ROLE))
        );
    }

    @Test
    void newMemberLoadUserTest() {
        when(gettingDefaultOAuth2UserService.loadUser(oAuth2UserRequest)).thenReturn(oAuth2User);
        when(memberRepository.findOptionalMemberByKakaoId(any())).thenReturn(Optional.empty());
        when(memberRepository.save(any())).thenReturn(
                new Member(MEMBER1.getKakaoId(), null, null, ROLE, null, null));

        OAuth2User authenticatedUser = customOAuth2UserService.loadUser(oAuth2UserRequest);
        assertAll(
                () -> assertThat(authenticatedUser.getName()).isEqualTo("51L"),
                () -> assertThat(authenticatedUser.getAttributes()).containsExactlyEntriesOf(
                        attribute),
                () -> assertThat(authenticatedUser.getAuthorities()).allMatch(
                        grantedAuthority -> grantedAuthority.getAuthority().equals(ROLE))
        );
    }
}