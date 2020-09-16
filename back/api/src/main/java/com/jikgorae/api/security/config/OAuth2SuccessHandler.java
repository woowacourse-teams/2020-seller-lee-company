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
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;
import com.jikgorae.api.security.web.AuthorizationType;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    public OAuth2SuccessHandler(
            JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res,
            Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String kakaoId = String.valueOf(oauth2User.getAttributes().get("id"));
        String token = jwtTokenProvider.createToken(kakaoId);

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setStatus(HttpStatus.OK.value());
        res.getWriter()
                .write(objectMapper.writeValueAsString(
                        TokenResponse.of(token, AuthorizationType.BEARER)));

    }
}