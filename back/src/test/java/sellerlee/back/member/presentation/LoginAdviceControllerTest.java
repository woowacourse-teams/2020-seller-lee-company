package sellerlee.back.member.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.member.presentation.AuthController.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;

import sellerlee.back.ControllerTest;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.domain.IllegalLoginException;

@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(controllers = {AuthController.class, LoginAdviceController.class})
class LoginAdviceControllerTest extends ControllerTest {
    @MockBean
    private MemberService memberService;

    @DisplayName("닉네임에 해당하는 회원이 없을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidEmail() throws Exception {
        String request = objectMapper.writeValueAsString(INVALID_EMAIL_MEMBER_LOGIN_REQUEST);

        doThrow(new IllegalLoginException("닉네임이 일치하는 회원이 존재하지 않습니다."))
                .when(memberService).login(any());

        // @formatter:off
        mockMvc
                .perform(
                        post(LOGIN_URI)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(document("login/advice/email",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("사용자가 입력한 닉네임"),
                                fieldWithPath("password").type(JsonFieldType.STRING).description("사용자가 입력한 비밀번호")
                        )));
        // @formatter:on
    }

    @DisplayName("회원의 비밀번호가 일치하지 않을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidPassword() throws Exception {
        String request = objectMapper.writeValueAsString(INVALID_PASSWORD_MEMBER_LOGIN_REQUEST);

        doThrow(new IllegalLoginException("비밀번호가 일치하지 않습니다.")).when(memberService).login(any());

        // @formatter:off
        mockMvc
                .perform(
                        post(LOGIN_URI)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(document("login/advice/password",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("nickname").description("사용자가 입력한 닉네임"),
                                fieldWithPath("password").description("사용자가 입력한 비밀번호")
                        )));
        // @formatter:on
    }
}
