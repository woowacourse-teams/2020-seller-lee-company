/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

import static java.util.Collections.singletonList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE_FIXTURE;
import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest {
    @MockBean
    private ArticleService articleService;

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("게시글 전체 조회시 HTTP status는 OK다.")
    @Test
    void showAll() throws Exception {
        when(articleService.showAll())
                .thenReturn(singletonList(ArticleResponse.of(ARTICLE_FIXTURE)));

        mockMvc.perform(get(ARTICLE_URI))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
