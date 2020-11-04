package com.jikgorae.api.article.presentation;

import static com.jikgorae.api.article.exception.AuthorizationException.*;
import static com.jikgorae.api.article.presentation.ArticleController.*;
import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.article.application.ArticleService;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.article.exception.AuthorizationException;
import com.jikgorae.api.article.query.ArticleDao;

@WebMvcTest(ArticleController.class)
class ArticleControllerAdviceTest extends ControllerTest {
    @MockBean
    private ArticleService articleService;

    @MockBean
    private ArticleViewService articleViewService;

    @MockBean
    private ArticleDao articleDao;

    @DisplayName("존재하지 않는 게시글에 대한 예외 핸들러")
    @Test
    void handleArticleNotFoundException() throws Exception {
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
                        document("articles/exception/not_found",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                )));
        // @formatter:on
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
                        document("articles/exception/unauthorized",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                )));
        // @formatter:on
    }

    @DisplayName("모든 예외에 대한 핸들러")
    @Test
    void handleDefaultException() throws Exception {
        doThrow(new RuntimeException())
                .when(articleService).deleteById(any(), any());

        // @formatter:off
        mockMvc
                .perform(
                        delete(ARTICLE_API_URI + "/" + ARTICLE1.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isInternalServerError())
                .andDo(
                        document("articles/exception/global",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                )));
        // @formatter:on
    }
}