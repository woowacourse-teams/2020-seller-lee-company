/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.TagFixture.*;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
        ArticleCreateRequest request = new ArticleCreateRequest(
                "노트북",
                Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2),
                "디지털/가전",
                "쌉니다 싸요",
                10000L,
                Arrays.asList("testUri1", "testUri2"),
                1L);
        when(articleRepository.save(any())).thenReturn(ARTICLE1);

        Long actualId = articleService.post(request);

        assertThat(actualId).isEqualTo(ARTICLE1.getId());
    }
}
