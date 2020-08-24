package sellerlee.back.security.config;

import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import sellerlee.back.security.oauth2.token.JwtTokenProvider;

@Component
public class MyOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    public static final String HEADER_STRING = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;

    public MyOAuth2SuccessHandler(
            JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res,
            Authentication authentication) {
        String id = authentication.getName();

        LinkedHashMap<String, Object> properties = (LinkedHashMap<String, Object>)((DefaultOAuth2User)authentication
                .getPrincipal()).getAttributes().get("properties");
        String name = (String)properties.get("nickname");

        String token = jwtTokenProvider.createToken(id, name);

        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}