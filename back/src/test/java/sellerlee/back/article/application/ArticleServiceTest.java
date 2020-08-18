package sellerlee.back.article.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TagFixture.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

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
        when(articleRepository.save(any())).thenReturn(ARTICLE1);

        ArticleRequest request = new ArticleRequest(
                "노트북",
                10000L,
                "디지털/가전",
                "쌉니다 싸요",
                Arrays.asList(TAG_FIXTURE1.getName(), TAG_FIXTURE2.getName()),
                Arrays.asList("testUri1", "testUri2"),
                1L);
        Long actualId = articleService.create(request);

        assertThat(actualId).isEqualTo(ARTICLE1.getId());
    }

    @DisplayName("게시글 수정 메소드 호출 시 게시글 수정")
    @Test
    void update() {
        Long articleId = 1L;
        ArticleRequest request = new ArticleRequest("update", 1L, "디지털/가전",
                "update", Collections.emptyList(), Collections.emptyList(), 1L);

        when(articleRepository.findById(articleId)).thenReturn(Optional.of(ARTICLE1));
        articleService.update(articleId, request);

        assertThat(ARTICLE1.getTitle()).isEqualTo(request.getTitle());
        assertThat(ARTICLE1.getContents()).isEqualTo(request.getContents());
    }

    @DisplayName("게시글 삭제 메서드 호출 시 게시글 삭제")
    @Test
    void deleteArticle() {
        articleService.deleteById(ARTICLE1.getId());

        verify(articleRepository).deleteById(ARTICLE1.getId());
    }

    @DisplayName("tradeState를 변경함")
    @Test
    void patchTradeState() {
        when(articleRepository.findByAuthorAndId(any(), any())).thenReturn(Optional.of(ARTICLE1));

        TradeSateUpdateRequest tradeSateUpdateRequest = new TradeSateUpdateRequest(51L, "예약중");

        articleService.updateTradeState(MEMBER1, tradeSateUpdateRequest);
    }
}
