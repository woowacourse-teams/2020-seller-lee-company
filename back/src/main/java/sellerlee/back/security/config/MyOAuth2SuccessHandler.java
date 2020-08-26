package sellerlee.back.security.config;

import java.io.IOException;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.AuthorizationType;

@Component
public class MyOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    public static final String HEADER_STRING = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MyOAuth2SuccessHandler(
            JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res,
            Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String email = (String)(((LinkedHashMap)oauth2User.getAttribute(
                "kakao_account")).get("email"));

        String token = jwtTokenProvider.createToken(email);

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setStatus(HttpStatus.OK.value());
        res.getWriter().write(objectMapper.writeValueAsString(TokenResponse.of(token,
                AuthorizationType.BEARER)));
    }
}