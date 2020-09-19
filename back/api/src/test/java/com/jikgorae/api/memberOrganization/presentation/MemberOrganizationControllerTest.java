package com.jikgorae.api.memberOrganization.presentation;

import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRegisterService;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationService;

@WebMvcTest(controllers = MemberOrganizationController.class)
class MemberOrganizationControllerTest extends ControllerTest {
    @MockBean
    private MemberOrganizationService service;

    @MockBean
    private MemberOrganizationRegisterService registerService;

    @DisplayName("회원/조직 연관관계를 생성한다.")
    @Test
    void create() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_직고래_REQUEST);

        when(registerService.register(any(), any())).thenReturn(MEMBER_직고래.getId());

        // @formatter:off
        mockMvc
                .perform(
                        post(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(
                        document("memberOrganization/create",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("code").description("조직의 입장 코드")
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("생성된 회원/조직 연관객체의 id가 담긴 URI")
                                )
                        )
                );
        // @formatter:on
    }

    @DisplayName("회원/조직 연관관계를 삭제한다.")
    @Test
    void delete_MemberOrganization() throws Exception {

        // @formatter:off
        mockMvc
                .perform(
                        delete(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("id", String.valueOf(MEMBER_직고래.getId())))
                .andExpect(status().isNoContent())
                .andDo(
                        document("memberOrganization/delete",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestParameters(
                                        parameterWithName("id").description("삭제할 회원/조직의 아이디")
                                )));
        // @formatter:on
    }
}
