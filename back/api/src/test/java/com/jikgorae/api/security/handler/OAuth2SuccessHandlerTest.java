package com.jikgorae.api.security.handler;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;

@ExtendWith(value = MockitoExtension.class)
class OAuth2SuccessHandlerTest {
    private static final String ROLE = "ROLE_USER";
    private static final String USER_NAME_ATTRIBUTE = "id";
    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private HttpServletRequest req;
    @Mock
    private HttpServletResponse res;
    @Mock
    private Authentication authentication;
    @Mock
    private PrintWriter printWriter;

    private OAuth2SuccessHandler oAuth2SuccessHandler;
    private OAuth2User oAuth2User;

    private Map<String, Object> attribute;

    @BeforeEach
    void setUp() {
        oAuth2SuccessHandler = new OAuth2SuccessHandler(jwtTokenProvider, memberRepository);
        attribute = new HashMap<>();
        attribute.put(USER_NAME_ATTRIBUTE, "51L");
        oAuth2User = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(ROLE)),
                attribute,
                USER_NAME_ATTRIBUTE
        );

    }

    @Test
    void onAuthenticationSuccessTest() throws IOException {
        when(authentication.getPrincipal()).thenReturn(oAuth2User);
        when(memberRepository.findOptionalMemberByKakaoId(any())).thenReturn(Optional.of(MEMBER1));
        when(jwtTokenProvider.createToken(any())).thenReturn("1234");
        when(res.getWriter()).thenReturn(printWriter);

        oAuth2SuccessHandler.onAuthenticationSuccess(req, res, authentication);
    }

    @Test
    void notFoundMemberOnAuthenticationSuccessTest() {
        when(authentication.getPrincipal()).thenReturn(oAuth2User);

        assertThatThrownBy(
                () -> oAuth2SuccessHandler.onAuthenticationSuccess(req, res, authentication))
                .isInstanceOf(AuthenticationCredentialsNotFoundException.class)
                .hasMessage("회원 인증을 실패하였습니다.");
    }
}