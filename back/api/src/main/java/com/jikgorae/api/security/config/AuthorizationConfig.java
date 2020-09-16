package com.jikgorae.api.security.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.jikgorae.api.security.web.LoginMemberMethodArgumentResolver;

@Configuration
public class AuthorizationConfig implements WebMvcConfigurer {
    private final LoginMemberMethodArgumentResolver loginMemberMethodArgumentResolver;

    public AuthorizationConfig(
            LoginMemberMethodArgumentResolver loginMemberMethodArgumentResolver) {
        this.loginMemberMethodArgumentResolver = loginMemberMethodArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginMemberMethodArgumentResolver);
    }
}
