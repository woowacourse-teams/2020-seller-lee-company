package sellerlee.back.article.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

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

        Long actualId = articleService.create(ARTICLE_REQUEST, MEMBER1);

        assertThat(actualId).isEqualTo(ARTICLE1.getId());
    }

    @DisplayName("게시글 수정 메소드 호출 시 게시글 수정")
    @Test
    void update() {
        Long articleId = 1L;
        when(articleRepository.findById(articleId)).thenReturn(Optional.of(ARTICLE1));

        articleService.update(articleId, ARTICLE_REQUEST, MEMBER1);

        assertThat(ARTICLE1.getTitle()).isEqualTo(ARTICLE_REQUEST.getTitle());
        assertThat(ARTICLE1.getContents()).isEqualTo(ARTICLE_REQUEST.getContents());
    }

    @DisplayName("게시글 삭제 메서드 호출 시 게시글 삭제")
    @Test
    void deleteArticle() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));

        articleService.deleteById(ARTICLE1.getId(),MEMBER1);

        verify(articleRepository).deleteById(ARTICLE1.getId());
    }

    @DisplayName("tradeState를 변경함")
    @Test
    void patchTradeState() {
        when(articleRepository.findByAuthorAndId(any(), any())).thenReturn(Optional.of(ARTICLE1));

        TradeStateRequest request = new TradeStateRequest("RESERVED");

        articleService.updateTradeState(ARTICLE1.getId(), request, MEMBER1);
    }
}
