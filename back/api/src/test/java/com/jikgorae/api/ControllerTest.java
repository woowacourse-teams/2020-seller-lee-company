package com.jikgorae.api;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static com.jikgorae.api.security.web.AuthorizationType.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.filter.JwtAuthenticationFilter;
import com.jikgorae.api.security.handler.OAuth2SuccessHandler;
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;
import com.jikgorae.api.security.oauth2.service.CustomOAuth2UserService;
import com.jikgorae.api.security.web.LoginMemberMethodArgumentResolver;

@ExtendWith(RestDocumentationExtension.class)
public class ControllerTest {
    protected static final String TEST_TOKEN_SECRET_KEY = "secretsecretsecret";
    protected static final String TEST_AUTHORIZATION_HEADER =
            String.join(TOKEN_DELIMITER, BEARER.toLowerCase(), TEST_TOKEN_SECRET_KEY);

    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected JwtTokenProvider jwtTokenProvider;

    @MockBean
    protected LoginMemberMethodArgumentResolver resolver;

    @MockBean
    protected CustomOAuth2UserService customOAuth2UserService;

    @MockBean
    protected OAuth2SuccessHandler OAuth2SuccessHandler;

    protected MockMvc mockMvc;

    protected ObjectMapper objectMapper;

    @BeforeEach
    protected void setUp(WebApplicationContext webApplicationContext,
            RestDocumentationContextProvider restDocumentation) {
        JwtAuthenticationFilter jwtAuthenticationFilter = (JwtAuthenticationFilter)webApplicationContext
                .getBean("jwtAuthenticationFilter");

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .addFilter(jwtAuthenticationFilter)
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(print())
                .build();
        objectMapper = new ObjectMapper();

        when(resolver.supportsParameter(any())).thenReturn(true);
        when(resolver.resolveArgument(any(), any(), any(), any())).thenReturn(MEMBER1);
    }
}
