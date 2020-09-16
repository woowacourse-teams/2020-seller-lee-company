package com.jikgorae.api.security.web;

import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.jikgorae.api.member.domain.IllegalLoginException;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.core.LoginMember;

@Component
public class LoginMemberMethodArgumentResolver implements HandlerMethodArgumentResolver {
    private final MemberRepository memberRepository;

    public LoginMemberMethodArgumentResolver(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginMember.class);
    }

    @Override
    public Object resolveArgument(@NonNull MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String kakaoId = Objects.requireNonNull(webRequest.getUserPrincipal(),
                "인증된 사용자가 존재하지 않습니다.").getName();

        if (StringUtils.isBlank(kakaoId)) {
            return new AuthenticationException("인증된 사용자가 존재하지 않습니다.");
        }
        try {
            return memberRepository.findOptionalMemberByKakaoId(kakaoId)
                    .orElseThrow(() -> new IllegalLoginException("닉네임이 일치하는 회원이 존재하지 않습니다."));
        } catch (Exception e) {
            throw new AuthenticationException("비정상적인 로그인입니다.");
        }
    }
}
