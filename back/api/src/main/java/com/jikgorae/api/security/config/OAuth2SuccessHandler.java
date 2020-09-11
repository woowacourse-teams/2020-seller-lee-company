package com.jikgorae.api.security.config;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jikgorae.api.member.application.TokenResponse;
import com.jikgorae.api.security.oauth2.token.JwtTokenProvider;
import com.jikgorae.api.security.web.AuthorizationType;
import com.jikgorae.common.member.domain.Member;
import com.jikgorae.common.member.domain.MemberRepository;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    public OAuth2SuccessHandler(
            JwtTokenProvider jwtTokenProvider,
            MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.objectMapper = new ObjectMapper();
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res,
            Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String kakaoId = String.valueOf(oauth2User.getAttributes().get("id"));

        Member member = memberRepository.findOptionalMemberByKakaoId(kakaoId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        String token = jwtTokenProvider.createToken(kakaoId);
        String memberState = member.getState().name();

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setStatus(HttpStatus.OK.value());
        res.getWriter()
                .write(objectMapper.writeValueAsString(
                        TokenResponse.of(token, memberState, AuthorizationType.BEARER)));

    }
}