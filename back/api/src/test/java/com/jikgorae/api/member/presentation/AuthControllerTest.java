package com.jikgorae.api.member.presentation;

import static com.jikgorae.api.member.presentation.AuthController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static com.jikgorae.api.security.web.context.TokenSecurityInterceptorTest.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.member.application.MemberService;

@WebMvcTest(controllers = AuthController.class)
@WithMockUser
class AuthControllerTest extends ControllerTest {
    @MockBean
    private MemberService memberService;

    @DisplayName("회원의 이름이 이미 있는 회원인지 조회한다.")
    @Test
    void findNickname() throws Exception {
        when(memberService.findNickname("lxxjn0")).thenReturn(true);

        // @formatter:off
        mockMvc
                .perform(
                        get(MEMBER_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("nickname","lxxjn0"))
                .andDo(print())
                .andExpect(status().isOk());
        // @formatter:on
    }
}
