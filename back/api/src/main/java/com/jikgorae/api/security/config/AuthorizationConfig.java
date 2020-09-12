package com.jikgorae.api.security.config;

import static com.jikgorae.api.common.PageController.*;
import static com.jikgorae.api.member.presentation.AuthController.*;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.jikgorae.api.security.web.context.TokenSecurityInterceptor;
import com.jikgorae.common.security.web.LoginMemberMethodArgumentResolver;


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
                .excludePathPatterns(MEMBER_API_URI, "/", API_DOCS_URI, PRIVACY_URI);
    }
}
