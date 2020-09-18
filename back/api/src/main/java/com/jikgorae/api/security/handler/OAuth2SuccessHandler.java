package com.jikgorae.api.security.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;
import com.jikgorae.api.security.web.AuthorizationType;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    public OAuth2SuccessHandler(
            JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res,
            Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String kakaoId = String.valueOf(oauth2User.getAttributes().get("id"));
        Member member = memberRepository.findOptionalMemberByKakaoId(kakaoId)
                .orElseThrow(
                        () -> new AuthenticationCredentialsNotFoundException("회원 인증을 실패하였습니다."));
        String token = jwtTokenProvider.createToken(kakaoId);

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setStatus(HttpStatus.OK.value());
        res.setCharacterEncoding("utf-8");
        res.getWriter()
                .write(objectMapper.writeValueAsString(
                        AuthTokenResponse.of(member.getId(), member.getNickname(),
                                member.getAvatar(), token, AuthorizationType.BEARER)));

    }
}
