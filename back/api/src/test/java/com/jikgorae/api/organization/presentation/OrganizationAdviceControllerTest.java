package com.jikgorae.api.organization.presentation;

import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
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
import com.jikgorae.api.organization.application.OrganizationService;
import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;
import com.jikgorae.api.organization.query.OrganizationDao;

@WebMvcTest(OrganizationController.class)
class OrganizationAdviceControllerTest extends ControllerTest {
    @MockBean
    private OrganizationService service;

    @MockBean
    private OrganizationDao organizationDao;

    @DisplayName("조직 생성에 대한 예외 핸들러")
    @Test
    void handleMemberOrganizationAlreadyExistsException() throws Exception {
        String request = objectMapper.writeValueAsString(직고래_요청);

        when(service.create(any())).thenThrow(
                new OrganizationAlreadyExistsException(ALREADY_EXISTS_ORGANIZATION_NAME));

        // @formatter:off
        mockMvc
                .perform(
                        post(ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(
                        document("organization/exception",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("name").description("생성할 조직 이름")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter: on
    }
}
