/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import static java.lang.String.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import sellerlee.back.ControllerTest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest extends ControllerTest {
    @MockBean
    private ArticleService articleService;

    @MockBean
    private ArticleViewService articleViewService;

    @DisplayName("게시글 생성 시 HTTP status는 Created다.")
    @Test
    void createArticle() throws Exception {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST_FIXTURE);

        when(articleService.post(any())).thenReturn(51L);

        // @formatter:off
        mockMvc.perform(
                    post(ARTICLE_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                    .andDo(print())
                    .andExpect(status().isCreated());
        // @formatter:on
    }

    @DisplayName("게시글 페이지 조회 시 HTTP status는 OK다.")
    @Test
    void showArticlePage() throws Exception {
        when(articleService.showArticlePage(LAST_ARTICLE_ID, ARTICLE_SIZE))
                .thenReturn(FeedResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1)));

        // @formatter:off
        mockMvc.perform(
                    get(ARTICLE_URI)
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                        .param("lastArticleId", valueOf(LAST_ARTICLE_ID))
                        .param("size", valueOf(ARTICLE_SIZE)))
                    .andDo(print())
                    .andExpect(status().isOk());
        // @formatter:on
    }

    @DisplayName("피드의 게시물을 상세조회 한다. 회원의 좋아요도 같이 받아온다.")
    @Test
    void showArticle() throws Exception {
        when(articleViewService.show(anyLong(), any())).thenReturn(
                ArticleResponse.of(ARTICLE1, true, 1));

        // @formatter:off
        mockMvc.perform(
                    get(ARTICLE_URI + "/{id}", ARTICLE1.getId())
                        .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                    .andDo(print())
                    .andExpect(status().isOk());
        // @formatter:on
    }
}
