package com.jikgorae.api.article.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;

@ExtendWith(value = MockitoExtension.class)
class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ArticleOrganizationService articleOrganizationService;

    @Mock
    private ArticleDeleteService articleDeleteService;

    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        articleService = new ArticleService(articleRepository, articleOrganizationService,
                articleDeleteService);
    }

    @DisplayName("게시글 생성 메서드 호출 시 게시글 생성")
    @Test
    void createArticle() {
        when(articleRepository.save(any())).thenReturn(ARTICLE1);

        Long actualId = articleService.create(직고래_게시물_요청, MEMBER1);

        assertThat(actualId).isEqualTo(ARTICLE1.getId());
    }

    @DisplayName("게시글 수정 메소드 호출 시 게시글 수정")
    @Test
    void update() {
        Long articleId = 1L;
        when(articleRepository.findById(articleId)).thenReturn(Optional.of(ARTICLE1));

        articleService.update(articleId, 직고래_게시물_요청, MEMBER1);

        assertThat(ARTICLE1.getTitle()).isEqualTo(직고래_게시물_요청.getTitle());
        assertThat(ARTICLE1.getContents()).isEqualTo(직고래_게시물_요청.getContents());
    }

    @DisplayName("게시글 삭제 메서드 호출 시 게시글 삭제")
    @Test
    void deleteById() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));

        articleService.deleteById(ARTICLE1.getId(), MEMBER1);

        verify(articleDeleteService).delete(ARTICLE1.getId());
    }

    @DisplayName("tradeState를 변경함")
    @Test
    void patchTradeState() {
        when(articleRepository.findByAuthorAndId(any(), any())).thenReturn(Optional.of(ARTICLE1));

        TradeStateRequest request = new TradeStateRequest("RESERVED");

        articleService.updateTradeState(ARTICLE1.getId(), request, MEMBER1);
    }
}
