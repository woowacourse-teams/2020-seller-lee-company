package sellerlee.back.security.web.context;

import static sellerlee.back.security.web.LoginMemberMethodArgumentResolver.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import sellerlee.back.security.oauth2.authentication.AuthorizationExtractor;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.AuthenticationException;
import sellerlee.back.security.web.AuthorizationType;

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

        if (StringUtils.isBlank(credentials)) {
            if (request.getServletPath().equals("/index.html") || request.getServletPath().equals("/docs.html")) {
                return true;
            }

            throw new AuthenticationException("토큰이 존재하지 않습니다.");
        }

        if (!jwtTokenProvider.validateToken(credentials)) {
            throw new AuthenticationException("토큰이 유효하지 않습니다.");
        }

        String nickname = jwtTokenProvider.getPayload(credentials);
        request.setAttribute(MEMBER_NICKNAME_ATTRIBUTE, nickname);
        return true;
    }
}
