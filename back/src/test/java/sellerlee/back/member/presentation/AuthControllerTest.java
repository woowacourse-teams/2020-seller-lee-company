package sellerlee.back.member.presentation;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.member.presentation.AuthController.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.AuthorizationType.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import sellerlee.back.ControllerTest;
import sellerlee.back.member.application.MemberService;

@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest extends ControllerTest {
    @MockBean
    private MemberService memberService;

    @DisplayName("닉네임, 비밀번호, 프로필 사진을 보내면 회원을 생성하고 HttpStatus는 Created이다.")
    @Test
    void join() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_CREATE_REQUEST);

        when(memberService.join(any())).thenReturn(56L);

        // @formatter:off
        mockMvc
                .perform(
                        post(MEMBER_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(status().isCreated());
        // @formatter:on
    }

    @DisplayName("로그인시 닉네임에 해당하는 회원이 존재하고, 패스워드가 일치하면 HttpStatus는 OK이다.")
    @Test
    void login() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_LOGIN_REQUEST);
        when(memberService.login(any())).thenReturn(TEST_TOKEN_SECRET_KEY);

        // @formatter:off
        mockMvc
                .perform(
                        post(LOGIN_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(jsonPath("$.accessToken", is(TEST_TOKEN_SECRET_KEY)))
                .andExpect(jsonPath("$.tokenType", is(BEARER.toLowerCase())))
                .andExpect(status().isOk());
        // @formatter:on
    }
}
