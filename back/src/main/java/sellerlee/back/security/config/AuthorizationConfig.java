package sellerlee.back.security.config;

import static sellerlee.back.member.presentation.AuthController.*;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import sellerlee.back.security.web.LoginMemberMethodArgumentResolver;
import sellerlee.back.security.web.context.TokenSecurityInterceptor;

@Configuration
public class AuthorizationConfig implements WebMvcConfigurer {
    private final LoginMemberMethodArgumentResolver loginMemberMethodArgumentResolver;
    private final TokenSecurityInterceptor tokenSecurityInterceptor;

    public AuthorizationConfig(
            LoginMemberMethodArgumentResolver loginMemberMethodArgumentResolver,
            TokenSecurityInterceptor tokenSecurityInterceptor) {
        this.loginMemberMethodArgumentResolver = loginMemberMethodArgumentResolver;
        this.tokenSecurityInterceptor = tokenSecurityInterceptor;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginMemberMethodArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenSecurityInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(MEMBER_URI, LOGIN_URI);
    }
}
