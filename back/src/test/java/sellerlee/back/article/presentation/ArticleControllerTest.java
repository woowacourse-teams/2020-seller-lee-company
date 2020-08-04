/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest {
    @MockBean
    private ArticleService articleService;
    @MockBean
    private ArticleViewService articleViewService;

    @Autowired
    private MockMvc mockMvc;

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

    @DisplayName("게시글 페이지 조회 시 HTTP status는 OK다.")
    @Test
    void showArticlePage() throws Exception {
        when(articleService.showArticlePage(LAST_ARTICLE_ID, ARTICLE_SIZE))
                .thenReturn(FeedResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1)));

        mockMvc.perform(get(ARTICLE_URI)
                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                .param("size", String.valueOf(ARTICLE_SIZE)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("피드의 게시물을 상세조회 한다. 회원의 좋아요도 같이 받아온다.")
    @Test
    void showArticle() throws Exception {
        when(articleViewService.showArticle(ARTICLE1.getId(), MEMBER1.getId()))
                .thenReturn(ArticleResponse.of(ARTICLE1, true));

        mockMvc.perform(get(ARTICLE_URI + "/{id}", ARTICLE1.getId())
                .param("memberId", String.valueOf(MEMBER1.getId())))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
