/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.article.domain.ArticleRepository;

import static org.mockito.Mockito.verify;

@ExtendWith(value = MockitoExtension.class)
class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository);
    }

    @DisplayName("showAll()이 articleRepository의 findAll()을 호출한다.")
    @Test
    void showAll() {
        articleService.showAll();
        verify(articleRepository).findAll();
    }
}
