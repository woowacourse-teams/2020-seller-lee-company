package sellerlee.back;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static sellerlee.back.fixture.MemberFixture.*;

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
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.config.OAuth2SuccessHandler;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.LoginMemberMethodArgumentResolver;
import sellerlee.back.security.web.context.TokenSecurityInterceptor;

@ExtendWith(RestDocumentationExtension.class)
public class ControllerTest {
    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected JwtTokenProvider jwtTokenProvider;

    @MockBean
    protected TokenSecurityInterceptor tokenSecurityInterceptor;

    @MockBean
    protected LoginMemberMethodArgumentResolver resolver;

    @MockBean
    protected OAuth2SuccessHandler OAuth2SuccessHandler;

    protected MockMvc mockMvc;

    protected ObjectMapper objectMapper;

    @BeforeEach
    protected void setUp(WebApplicationContext webApplicationContext,
            RestDocumentationContextProvider restDocumentation) throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(print())
                .build();
        objectMapper = new ObjectMapper();

        when(tokenSecurityInterceptor.preHandle(any(), any(), any())).thenReturn(true);
        when(resolver.supportsParameter(any())).thenReturn(true);
        when(resolver.resolveArgument(any(), any(), any(), any())).thenReturn(MEMBER1);
    }
}
