package sellerlee.back.member.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.member.presentation.ProfileController.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import sellerlee.back.ControllerTest;
import sellerlee.back.member.application.MemberService;

@WebMvcTest(controllers = ProfileController.class)
class ProfileControllerTest extends ControllerTest {
    @MockBean
    MemberService memberService;

    @DisplayName("프로필 조회 시 회원 정보와 Status OK 반환")
    @Test
    void show() throws Exception {
        mockMvc.perform(
                get(PROFILE_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk())
                .andDo(
                        document("me/get",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("nickname").description("회원의 닉네임"),
                                        fieldWithPath("avatar").description("회원의 아바타"),
                                        fieldWithPath("score").description("회원의 정보")
                                )));
    }

    @Test
    void update() throws Exception {
        String request = objectMapper.writeValueAsString(PROFILE_REQUEST);

        doNothing().when(memberService).update(any(), any());

        mockMvc.perform(
                put(PROFILE_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isNoContent())
                .andDo(
                        document("me/put",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("password").description("회원의 비밀번호"),
                                        fieldWithPath("avatar").description("회원의 아바타")
                                )));
    }
}