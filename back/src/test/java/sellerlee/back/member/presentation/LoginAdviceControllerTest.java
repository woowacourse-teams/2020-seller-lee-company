package sellerlee.back.member.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.domain.IllegalMemberLoginException;

@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(controllers = {MemberController.class, LoginAdviceController.class})
class LoginAdviceControllerTest {
    @MockBean
    private MemberService memberService;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp(WebApplicationContext context, RestDocumentationContextProvider restDocumentation) {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(print())
                .build();
    }

    @DisplayName("이메일에 해당하는 회원이 없을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidEmail() throws Exception {
        String request = objectMapper.writeValueAsString(
                INVALID_EMAIL_MEMBER_LOGIN_REQUEST);

        doThrow(new IllegalMemberLoginException("이메일이 일치하는 회원이 존재하지 않습니다."))
                .when(memberService).login(any());

        mockMvc.perform(post("/login")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andDo(document("login/advice/email",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("email").type(JsonFieldType.STRING)
                                        .description("사용자가 입력한 이메일"),
                                fieldWithPath("password").type(JsonFieldType.STRING)
                                        .description("사용자가 입력한 비밀번호")
                        )
                ));
    }

    @DisplayName("회원의 비밀번호가 일치하지 않을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidPassword() throws Exception {
        String request = objectMapper.writeValueAsString(
                INVALID_PASSWORD_MEMBER_LOGIN);

        doThrow(new IllegalMemberLoginException("비밀번호가 일치하지 않습니다."))
                .when(memberService).login(any());

        mockMvc.perform(post("/login")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(document("login/advice/password",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("email").description("사용자가 입력한 이메일"),
                                fieldWithPath("password").description("사용자가 입력한 비밀번호")
                        )
                ));
    }
}
