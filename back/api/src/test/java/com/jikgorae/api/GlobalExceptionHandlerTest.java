package com.jikgorae.api;

import static com.jikgorae.api.article.exception.AuthorizationException.*;
import static com.jikgorae.api.article.presentation.ArticleController.*;
import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
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

import com.jikgorae.api.article.application.ArticleService;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.article.exception.AuthorizationException;
import com.jikgorae.api.article.presentation.ArticleController;
import com.jikgorae.api.article.query.ArticleDao;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRegisterService;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationService;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;
import com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@WebMvcTest(controllers = {ArticleController.class, MemberOrganizationController.class})
class GlobalExceptionHandlerTest extends ControllerTest {
    @MockBean
    private ArticleService articleService;

    @MockBean
    private ArticleViewService articleViewService;

    @MockBean
    private ArticleDao articleDao;

    @MockBean
    private MemberOrganizationService service;

    @MockBean
    private MemberOrganizationRegisterService registerService;

    @DisplayName("존재하지 않는 게시글에 대한 예외 핸들러")
    @Test
    void handleIllegalArgumentException_Thrown_ArticleNotFoundException() throws Exception {
        TradeStateRequest tradeStateRequest = new TradeStateRequest("RESERVED");
        String request = objectMapper.writeValueAsString(tradeStateRequest);
        doThrow(new ArticleNotFoundException(ARTICLE1.getId()))
                .when(articleService).updateTradeState(any(), any(), any());

        // @formatter:off
        mockMvc
                .perform(
                        put(ARTICLE_API_URI + "/" + MEMBER1.getId() + ArticleController.TRADE_STATE_URI)
                                .content(request)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isBadRequest())
                .andDo(
                        document("exception/illegalArgumentException/articleNotFoundException",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter:on
    }

    @DisplayName("이미 가입된 조직에 대한 예외 핸들러")
    @Test
    void handleIllegalArgumentException_Thrown_MemberOrganizationAlreadyExistsException() throws
            Exception {
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
                        document("exception/illegalArgumentException/memberOrganizationAlreadyExistsException",
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
    void handleIllegalArgumentException_Thrown_OrganizationNotFoundException() throws Exception {
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
                        document("exception/illegalArgumentException/organizationNotFoundException",
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

    @DisplayName("권한이 없는 상황에 대한 예외 핸들러")
    @Test
    void handleAuthorizationException() throws Exception {
        doThrow(new AuthorizationException(UNAUTHORIZED_TO_DELETE, ARTICLE1.getId(),
                MEMBER2.getId()))
                .when(articleService).deleteById(any(), any());

        // @formatter:off
        mockMvc
                .perform(
                        delete(ARTICLE_API_URI + "/" + ARTICLE1.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isUnauthorized())
                .andDo(
                        document("exception/unauthorizedException",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter:on
    }

    @DisplayName("모든 예외에 대한 핸들러")
    @Test
    void handleUnexpectedException() throws Exception {
        doThrow(new RuntimeException("예기치 못한 에러가 발생했습니다."))
                .when(articleService).deleteById(any(), any());

        // @formatter:off
        mockMvc
                .perform(
                        delete(ARTICLE_API_URI + "/" + ARTICLE1.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isInternalServerError())
                .andDo(
                        document("exception/globalException",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("exceptionClassName").type(JsonFieldType.STRING).description("예외 클래스의 이름"),
                                        fieldWithPath("errorMessage").type(JsonFieldType.STRING).description("예외 메시지")
                                )));
        // @formatter:on
    }
}