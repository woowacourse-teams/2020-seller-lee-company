package com.jikgorae.api.security.web.context;

import static com.jikgorae.api.member.presentation.AuthController.*;
import static com.jikgorae.common.security.web.LoginMemberMethodArgumentResolver.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor;
import com.jikgorae.api.security.oauth2.token.JwtTokenProvider;
import com.jikgorae.api.security.web.AuthorizationType;
import com.jikgorae.common.security.web.AuthenticationException;

@Component
public class TokenSecurityInterceptor implements HandlerInterceptor {
    private final JwtTokenProvider jwtTokenProvider;

    public TokenSecurityInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler) throws Exception {
        String credentials = AuthorizationExtractor.extract(request, AuthorizationType.BEARER);
        boolean isHTMLFile = request.getServletPath().contains("html");
        boolean isJoinRequest =
                HttpMethod.POST.matches(request.getMethod()) && (MEMBER_API_URI).equals(
                        request.getServletPath());

        if (StringUtils.isBlank(credentials)) {
            if (isHTMLFile || isJoinRequest) {
                return true;
            }
            throw new AuthenticationException("토큰이 존재하지 않습니다.");
        }

        if (!jwtTokenProvider.validateToken(credentials)) {
            throw new AuthenticationException("토큰이 유효하지 않습니다.");
        }

        String kakaoId = jwtTokenProvider.getPayload(credentials);
        request.setAttribute(MEMBER_KAKAO_ID_ATTRIBUTE, kakaoId);
        return true;
    }
}
