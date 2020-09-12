package com.jikgorae.api.articlefavoritecount.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCount;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountRepository;

@ExtendWith(MockitoExtension.class)
class ArticleFavoriteCountServiceTest {
    @Mock
    private ArticleFavoriteCountRepository articleFavoriteCountRepository;

    private ArticleFavoriteCountService articleFavoriteCountService;

    @BeforeEach
    void setUp() {
        articleFavoriteCountService = new ArticleFavoriteCountService(
                articleFavoriteCountRepository);
    }

    @DisplayName("어떤 게시물에 찜이 존재할때, 찜 증가 요청을 하면 찜 개수가 증가한다.")
    @Test
    void increase() {
        ArticleFavoriteCount articleFavoriteCount = new ArticleFavoriteCount(1L, ARTICLE1, 1L);

        when(articleFavoriteCountRepository.findByArticle(any()))
                .thenReturn(Optional.of(articleFavoriteCount));

        articleFavoriteCountService.increase(ARTICLE1);

        assertThat(articleFavoriteCount.getFavoriteCount()).isEqualTo(2L);
    }

    @DisplayName("어떤 게시물에 찜이 존재하지 않을때, 찜 증가 요청을 하면 새로운 찜 개수가 생성된다.")
    @Test
    void increaseWhenNoFavoriteCount() {
        when(articleFavoriteCountRepository.findByArticle(any()))
                .thenReturn(Optional.empty());

        articleFavoriteCountService.increase(ARTICLE1);

        verify(articleFavoriteCountRepository).save(any());
    }

    @DisplayName("어떤 게시물에 찜이 존재할때, 찜 감소 요청을 하면 찜 개수가 감소한다.")
    @Test
    void decrease() {
        ArticleFavoriteCount articleFavoriteCount = new ArticleFavoriteCount(1L, ARTICLE1, 1L);

        when(articleFavoriteCountRepository.findByArticle(any()))
                .thenReturn(Optional.of(articleFavoriteCount));

        articleFavoriteCountService.decrease(ARTICLE1);

        assertThat(articleFavoriteCount.getFavoriteCount()).isEqualTo(0L);
    }
}