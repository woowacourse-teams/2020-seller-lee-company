package com.jikgorae.api.memberOrganization.presentation;

import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;

@WebMvcTest(controllers = MemberOrganizationController.class)
class MemberOrganizationControllerTest extends ControllerTest {
    @DisplayName("회원/조직 연관 관계를 생성한다.")
    @Test
    void create() throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_ORGANIZATION_REQUEST);

        mockMvc
                .perform(
                        post(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(
                        document("memberOrganization",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("code").description("조직의 입장 코드")
                                ),
                                responseHeaders(
                                        headerWithName("Location").description(
                                                "생성된 회원/조직 연관객체의 id가 담긴 URI")
                                )));
    }
}
