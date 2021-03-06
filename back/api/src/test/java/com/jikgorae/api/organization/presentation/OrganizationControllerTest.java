package com.jikgorae.api.organization.presentation;

import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.organization.application.OrganizationService;
import com.jikgorae.api.organization.domain.OrganizationRepository;
import com.jikgorae.api.organization.query.OrganizationDao;

@WebMvcTest(controllers = OrganizationController.class)
class OrganizationControllerTest extends ControllerTest {
    @MockBean
    private OrganizationService organizationService;

    @MockBean
    private OrganizationRepository organizationRepository;

    @MockBean
    private OrganizationDao organizationDao;

    @DisplayName("조직 생성 시 HTTP STATUS는 CREATE이고 랜덤한 6자리 입장 코드를 반환")
    @Test
    void create() throws Exception {
        String request = objectMapper.writeValueAsString(직고래_요청);

        when(organizationService.create(any())).thenReturn(직고래);

        // @formatter:off
        mockMvc
                .perform(
                        post(ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(
                        document("organizations/create",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("name").description("조직의 이름")
                                ),
                                responseFields(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("조직의 id"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("조직의 이름"),
                                        fieldWithPath("code").type(JsonFieldType.STRING).description("조직의 입장 코드")
                                )));
        // @formatter:on
    }

    @DisplayName("회원이 가입한 조직을 조회 시 HTTP STATUS는 OK이고 가입한 조직을 반환")
    @Test
    void showAll() throws Exception {
        when(organizationDao.showAll(any())).thenReturn(
                Lists.newArrayList(직고래_응답, 우아한테크코스_응답));

        // @formatter:off
        mockMvc
                .perform(
                        get(ORGANIZATION_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk())
                .andDo(
                        document("organizations/get",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("조직의 id"),
                                        fieldWithPath("[].name").type(JsonFieldType.STRING).description("조직의 이름"),
                                        fieldWithPath("[].code").type(JsonFieldType.STRING).description("조직의 입장 코드")
                                )));
        // @formatter:on
    }
}
