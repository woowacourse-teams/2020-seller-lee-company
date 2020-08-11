/**
 * @author lxxjn0
 */

package sellerlee.back.member.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.MemberFixture.*;

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

@WebMvcTest(controllers = MemberController.class)
class MemberControllerTest {
    @MockBean
    private MemberService memberService;

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

        doNothing().when(memberService).login(any());

        mockMvc.perform(post("/login")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
