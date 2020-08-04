/**
 * @author begaonnuri
 */

package sellerlee.back.article.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.application.ArticleService.*;
import static sellerlee.back.article.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.TagFixture.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;

@ExtendWith(value = MockitoExtension.class)
class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository);
    }

    @DisplayName("게시글 생성 메서드 호출 시 게시글 생성")
    @Test
    void createArticle() {
        ArticleCreateRequest request = new ArticleCreateRequest("노트북", 10000L, "디지털/가전", "쌉니다 싸요",
                Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2), Arrays.asList("testUri1", "testUri2"),
                1L);
        when(articleRepository.save(any())).thenReturn(ARTICLE1);

        Long actualId = articleService.post(request);

        assertThat(actualId).isEqualTo(ARTICLE1.getId());
    }

    @DisplayName("showArticlePages()에서 마지막 글의 id와 가져올 size를 입력한 경우 입력한 id보다 작은 게시글 리스트 반환")
    @Test
    void showArticlePages() {
        PageRequest pageRequest = PageRequest.of(FIRST_PAGE, ARTICLE_SIZE);
        Page<Article> expectedPage = new PageImpl<>(Arrays.asList(ARTICLE2, ARTICLE1));

        when(articleRepository.findByIdLessThanOrderByIdDesc(LAST_ARTICLE_ID,
                pageRequest)).thenReturn(expectedPage);
        List<FeedResponse> actualArticles = articleService.showArticlePage(LAST_ARTICLE_ID,
                ARTICLE_SIZE);

        assertThat(actualArticles.get(0).getId()).isEqualTo(ARTICLE2.getId());
        assertThat(actualArticles.get(1).getId()).isEqualTo(ARTICLE1.getId());
    }
}
