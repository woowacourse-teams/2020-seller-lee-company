package sellerlee.back.article.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Arrays;

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

    @Autowired
    private ObjectMapper objectMapper;

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

    @DisplayName("게시글 페이지 조회 시 HTTP STATUS OK와 페이지 별 게시글 반환")
    @Test
    void showPage() throws Exception {
        when(articleService.showPage(LAST_ARTICLE_ID, ARTICLE_SIZE))
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
        when(articleViewService.showArticle(ARTICLE1.getId(), MEMBER1))
                .thenReturn(ArticleResponse.of(ARTICLE1, true, 1));

        mockMvc.perform(get(ARTICLE_URI + "/{id}", ARTICLE1.getId())
                .param("memberId", String.valueOf(MEMBER1.getId())))
                .andDo(print())
                .andExpect(status().isOk());
    }

    // @DisplayName("게시글 판매 상태로 게시글 조회 시 HTTP STATUS OK와 판매 상태에 해당하는 게시글 반환")
    // @Test
    // void showArticlesByTradeState() throws Exception {
    //     String tradeState = "ON_SALE";
    //
    //     when(articleViewService.showByTradeState(tradeState)).thenReturn(anyList());
    //
    //     mockMvc.perform(get(ARTICLE_URI + "/trade-state")
    //             .param("tradeState", tradeState))
    //             .andDo(print())
    //             .andExpect(status().isOk());
    // }
}
