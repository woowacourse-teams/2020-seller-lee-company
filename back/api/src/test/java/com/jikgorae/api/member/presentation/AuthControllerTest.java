package com.jikgorae.api.member.presentation;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.member.presentation.AuthController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
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
        when(memberService.isPresentMember("lxxjn0")).thenReturn(true);

        mockMvc
                .perform(
                        get(MEMBER_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("nickname", "lxxjn0"))
                .andExpect(status().isOk())
                .andDo(document("auth/findNickname",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("회원의 토큰")
                        )));
    }

    @DisplayName("회원의 푸시토큰 수정 시 회원 정보 수정 및 No Content 반환")
    @Test
    void updatePushToken() throws Exception {
        String request = objectMapper.writeValueAsString(PUSH_TOKEN_REQUEST);

        mockMvc
                .perform(
                        put(MEMBER_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(status().isNoContent())
                .andDo(document("auth/updatePushToken",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("회원의 토큰")
                        ),
                        requestFields(
                                fieldWithPath("pushToken").description("회원의 알림 토큰")
                        )));
    }
}
