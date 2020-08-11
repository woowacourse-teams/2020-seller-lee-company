/**
 * @author lxxjn0
 */

package sellerlee.back.member.presentation;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.AuthorizationType;
import sellerlee.back.security.web.context.TokenSecurityInterceptor;

@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest {

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private TokenSecurityInterceptor tokenSecurityInterceptor;

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @DisplayName("로그인시 이메일에 해당하는 회원이 존재하고, 패스워드가 일치하면 HttpStatus는 OK이다.")
    @Test
    void login() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_LOGIN_REQUEST_FIXTURE);

        when(memberService.login(any())).thenReturn(TEST_TOKEN_SECRET_KEY);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(request))
                .andDo(print())
                .andExpect(jsonPath("$.accessToken", is(TEST_TOKEN_SECRET_KEY)))
                .andExpect(jsonPath("$.tokenType", is(AuthorizationType.BEARER.toLowerCase())))
                .andExpect(status().isOk());
    }
}
