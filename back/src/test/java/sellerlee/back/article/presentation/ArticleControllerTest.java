/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

import static java.util.Collections.singletonList;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE_CREATE_REQUEST_FIXTURE;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE_FIXTURE;
import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;

@WebMvcTest(controllers = ArticleController.class)
public class ArticleControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleService articleService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @DisplayName("게시글 생성 시 HTTP status는 Created다.")
    @Test
    void createArticle() throws Exception {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST_FIXTURE);

        when(articleService.post(any())).thenReturn(1L);

        this.mockMvc.perform(post(ARTICLE_URI)
                .content(request)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @DisplayName("게시글 전체 조회 시 HTTP status는 OK다.")
    @Test
    void showAll() throws Exception {
        when(articleService.showAll())
                .thenReturn(singletonList(ArticleResponse.of(ARTICLE_FIXTURE)));

        mockMvc.perform(get(ARTICLE_URI))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
