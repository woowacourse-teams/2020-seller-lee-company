package sellerlee.back.article.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.when;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository);
    }

    @DisplayName("showAll()이 모든 ArticleResponse를 반환한다.")
    @Test
    void showAll() {
        when(articleRepository.findAll()).thenReturn(Arrays.asList(new Article(), new Article()));
        assertThat(articleService.showAll().size()).isEqualTo(2);
    }
}
