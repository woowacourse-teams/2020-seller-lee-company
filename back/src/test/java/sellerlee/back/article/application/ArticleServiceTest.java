/**
 * @author jnsorn
 */

package sellerlee.back.article.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.article.domain.ArticleRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static sellerlee.back.article.fixture.ArticleFixture.ARTICLE_FIXTURE;

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
        ArticleCreateRequest request = new ArticleCreateRequest("노트북", 10000L, "디지털/가전", "쌉니다 싸요", 1L, "#선풍기#굿");
        when(articleRepository.save(any())).thenReturn(ARTICLE_FIXTURE);

        Long actualId = articleService.post(request);

        assertThat(actualId).isEqualTo(ARTICLE_FIXTURE.getId());
    }

    @DisplayName("showAll()이 articleRepository의 findAll()을 호출한다.")
    @Test
    void showAll() {
        articleService.showAll();
        verify(articleRepository).findAll();
    }
}
