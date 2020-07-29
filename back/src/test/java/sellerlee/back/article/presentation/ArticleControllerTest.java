/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import static java.util.Collections.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.fixture.ArticleFixture.*;
import static sellerlee.back.article.presentation.ArticleController.*;

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

    @DisplayName("게시글 전체 조회시 HttpStatus는 OK다.")
    @Test
    void showAll() throws Exception {
        when(articleService.showAll())
                .thenReturn(singletonList(ArticleResponse.of(ARTICLE_FIXTURE)));

        mockMvc.perform(get(ARTICLE_URI))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
