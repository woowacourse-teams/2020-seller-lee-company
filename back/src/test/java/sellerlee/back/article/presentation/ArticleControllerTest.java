/**
 * @author begaonnuri
 */

package sellerlee.back.article.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.acceptance.AcceptanceTest.*;
import static sellerlee.back.article.fixture.ArticleFixture.*;
import static sellerlee.back.article.presentation.ArticleController.*;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest {
    @MockBean
    private ArticleService articleService;

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("게시글 전체 조회시 HTTP status는 OK다.")
    @Test
    void showAll() throws Exception {
        when(articleService.showArticlePage(LAST_ARTICLE_ID, ARTICLE_SIZE))
                .thenReturn(ArticleResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1)));

        mockMvc.perform(get(ARTICLE_URI)
                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                .param("size", String.valueOf(ARTICLE_SIZE)))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
