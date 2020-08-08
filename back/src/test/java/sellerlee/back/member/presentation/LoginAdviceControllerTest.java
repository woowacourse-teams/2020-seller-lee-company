package sellerlee.back.member.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.domain.IllegalMemberLoginException;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.fixture.MemberFixture.INVALID_EMAIL_MEMBER_LOGIN_REQUEST_FIXTURE;
import static sellerlee.back.fixture.MemberFixture.INVALID_PASSWORD_MEMBER_LOGIN_REQUEST_FIXTURE;

@WebMvcTest(controllers = {MemberController.class, LoginAdviceController.class})
class LoginAdviceControllerTest {
    @MockBean
    private MemberService memberService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("이메일에 해당하는 회원이 없을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidEmail() throws Exception {
        String request = objectMapper.writeValueAsString(
                INVALID_EMAIL_MEMBER_LOGIN_REQUEST_FIXTURE);

        doThrow(new IllegalMemberLoginException("이메일이 일치하는 회원이 존재하지 않습니다."))
                .when(memberService).login(any());

        mockMvc.perform(post("/login")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @DisplayName("회원의 비밀번호가 일치하지 않을 경우 HttpStatus는 BadRequest이다.")
    @Test
    void handleIllegalMemberLoginException_InvalidPassword() throws Exception {
        String request = objectMapper.writeValueAsString(
                INVALID_PASSWORD_MEMBER_LOGIN_REQUEST_FIXTURE);

        doThrow(new IllegalMemberLoginException("비밀번호가 일치하지 않습니다."))
                .when(memberService).login(any());

        mockMvc.perform(post("/login")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
