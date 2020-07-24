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
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.article.presentation.ArticleCreateRequest;
import sellerlee.back.article.presentation.ArticleResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository);
    }

    @DisplayName("게시글 생성 메서드 호출 시 게시글 생성? ")
    @Test
    void createArticle() {
        ArticleCreateRequest request = new ArticleCreateRequest("노트북", 10000L, "쌉니다 싸요");
        Article expectedArticle = new Article(1L, "노트북", 10000L, "쌉니다 싸요");
        when(articleRepository.save(any())).thenReturn(expectedArticle);

        ArticleResponse response = articleService.createArticle(request.toArticle());

        assertThat(response.getId()).isEqualTo(expectedArticle.getId());
    }
}