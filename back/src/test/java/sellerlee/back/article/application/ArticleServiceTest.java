/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import sellerlee.back.article.domain.ArticleRepository;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ArticleServiceTest {
    @Autowired
    private ArticleRepository articleRepository;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository);
    }

    @DisplayName("showAll()이 모든 Article을 반환한다.")
    @Test
    void showAll() {
        assertThat(articleService.showAll().size()).isEqualTo(2);
    }
}
