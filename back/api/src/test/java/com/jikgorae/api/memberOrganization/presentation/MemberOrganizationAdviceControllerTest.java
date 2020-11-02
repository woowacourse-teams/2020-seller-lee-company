package com.jikgorae.api.memberOrganization.presentation;

import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.organization.exception.OrganizationNotFoundException.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRegisterService;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationService;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@WebMvcTest(MemberOrganizationController.class)
class MemberOrganizationAdviceControllerTest extends ControllerTest {
    @MockBean
    private MemberOrganizationService service;

    @MockBean
    private MemberOrganizationRegisterService registerService;

    @DisplayName("이미 가입된 조직에 대한 예외 핸들러")
    @Test
    void handleMemberOrganizationAlreadyExistsException() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_직고래_REQUEST);

        when(registerService.register(any(), any())).thenThrow(
                new MemberOrganizationAlreadyExistsException(ALREADY_JOINT_ORGANIZATION));

        // @formatter:off
        mockMvc
                .perform(
                        post(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(
                        document("memberOrganization/exception",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("code").description("조직의 입장 코드")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter: on
    }

    @DisplayName("존재하지 않는 조직에 대한 예외 핸들러")
    @Test
    void handleOrganizationNotFoundException() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_직고래_REQUEST);

        when(registerService.register(any(), any())).thenThrow(
                new OrganizationNotFoundException(ILLEGAL_ORGANIZATION_CODE));

        // @formatter:off
        mockMvc
                .perform(
                        post(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(
                        document("memberOrganization/exception",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("code").description("조직의 입장 코드")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter: on
    }
}
