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
import sellerlee.back.article.application.ArticleService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        ArticleCreateRequest articleCreateRequest = new ArticleCreateRequest("노트북", 10000L,"쌉니다 싸요");
        String request = objectMapper.writeValueAsString(articleCreateRequest);
        ArticleResponse response = ArticleResponse.of(articleCreateRequest.toArticle());

        given(articleService.createArticle(any())).willReturn(response);

        this.mockMvc.perform(post("/articles")
                .content(request)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}