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
import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.application.ArticleService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
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

    @DisplayName("게시글 생성 요청을 받은 경우 게시글 생성")
    @Test
    void createArticle() throws Exception {
        ArticleCreateRequest articleCreateRequest = new ArticleCreateRequest("노트북", 10000L, "디지털/가전", "쌉니다 싸요", 1L, "#노트북 #좋아");
        String request = objectMapper.writeValueAsString(articleCreateRequest);

        when(articleService.post(any())).thenReturn(1L);

        this.mockMvc.perform(post(ARTICLE_URI)
                .content(request)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
