package sellerlee.back.security.web;

import static org.springframework.web.context.request.RequestAttributes.*;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.core.LoginMember;

@Component
public class LoginMemberMethodArgumentResolver implements HandlerMethodArgumentResolver {
    public static final String MEMBER_EMAIL_ATTRIBUTE = "loginEmail";

    private final MemberRepository memberRepository;

    public LoginMemberMethodArgumentResolver(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginMember.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String email = (String)webRequest.getAttribute(MEMBER_EMAIL_ATTRIBUTE, SCOPE_REQUEST);

        if (StringUtils.isBlank(email)) {
            return new AuthenticationException("인증된 사용자가 존재하지 않습니다.");
        }
        try {
            return memberRepository.findMemberByEmail(email);
        } catch (Exception e) {
            throw new AuthenticationException("비정상적인 로그인입니다.");
        }
    }
}
