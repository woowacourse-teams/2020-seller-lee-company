/**
 * @author kouz95
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
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.ARTICLE_SIZE;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.LAST_ARTICLE_ID;
import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.FavoriteFixture.FAVORITE;
import static sellerlee.back.fixture.MemberFixture.MEMBER1;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest {
    @MockBean
    private ArticleService articleService;
    @MockBean
    private ArticleViewService articleViewService;

    @Autowired
    private MockMvc mockMvc;

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
        when(articleViewService.showArticle(1L, 1L))
                .thenReturn(ArticleResponse.of(ARTICLE1, FAVORITE));

        mockMvc.perform(get(ARTICLE_URI + "/{id}", ARTICLE1.getId())
                .param("memberId", String.valueOf(MEMBER1.getId())))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
