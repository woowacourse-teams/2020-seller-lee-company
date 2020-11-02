package com.jikgorae.api.member.presentation;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.member.presentation.ProfileController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.member.application.MemberService;
import com.jikgorae.api.member.domain.IllegalJoinException;
import com.jikgorae.api.member.domain.IllegalLoginException;

@WebMvcTest(controllers = ProfileController.class)
class AuthAdviceControllerTest extends ControllerTest {
    @MockBean
    MemberService memberService;

    @DisplayName("IllegalJoinException 발생 시 Bad Request 반환")
    @Test
    void handleIllegalMemberJoinException() throws Exception {
        String request = objectMapper.writeValueAsString(PROFILE_REQUEST);

        doThrow(IllegalJoinException.class).when(memberService).update(any(), any());

        mockMvc.perform(
                put(PROFILE_API_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isBadRequest());
    }

    @DisplayName("IllegalLoginException 발생 시 Bad Request 반환")
    @Test
    void handleIllegalMemberLoginException() throws Exception {
        doThrow(IllegalLoginException.class).when(memberService).update(any(), any());

        mockMvc.perform(
                put(PROFILE_API_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}