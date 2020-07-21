/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ArticleServiceTest {
    @Autowired
    private ArticleService articleService;

    @DisplayName("showAll()이 모든 Article을 반환한다.")
    @Test
    void showAll() {
        assertThat(articleService.showAll().size()).isEqualTo(2);
    }
}
