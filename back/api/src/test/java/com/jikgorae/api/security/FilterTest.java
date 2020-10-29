package com.jikgorae.api.security;

import static com.jikgorae.api.article.presentation.ArticleController.*;
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
import com.jikgorae.api.article.presentation.ArticleController;
import com.jikgorae.api.article.query.ArticleDao;

@WebMvcTest(controllers = ArticleController.class)
class FilterTest extends ControllerTest {
    private static final String UN_VALID_TOKEN = "bearer aaa";
    @MockBean
    private ArticleService articleService;
    @MockBean
    private ArticleViewService articleViewService;
    @MockBean
    private ArticleDao articleDao;

    @DisplayName("Filter 에서 AuthenticationError 를 던진다.")
    @Test
    void throwAuthenticationException() throws Exception {
        doNothing().when(articleService).updateTradeState(anyLong(), any(), any());
        when(jwtTokenProvider.resolveToken(any())).thenCallRealMethod();
        when(jwtTokenProvider.validateToken(any())).thenCallRealMethod();

        TradeStateRequest tradeStateRequest = new TradeStateRequest("RESERVED");

        String request = objectMapper.writeValueAsString(tradeStateRequest);

        // @formatter:off
        mockMvc
                .perform(
                        put(ARTICLE_API_URI + "/" + MEMBER1.getId() + ArticleController.TRADE_STATE_URI)
                                .content(request)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(AUTHORIZATION, UN_VALID_TOKEN)
                                )
                .andExpect(status().isBadRequest())
                .andDo(
                        document("articles/updateTradeState",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                )));
        // @formatter:on
    }
}
