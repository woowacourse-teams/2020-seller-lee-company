package com.jikgorae.api.favorite.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.FavoriteFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static java.util.Collections.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;
import com.jikgorae.api.favorite.domain.Favorite;
import com.jikgorae.api.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class FavoriteServiceTest {
    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private ArticleRepository articleRepository;

    private FavoriteService favoriteService;

    @BeforeEach
    void setUp() {
        favoriteService = new FavoriteService(favoriteRepository);
    }

    @DisplayName("create 요청시 Id가 생성된다.")
    @Test
    void create() {
        when(favoriteRepository.save(any())).thenReturn(new Favorite(1L, ARTICLE1, MEMBER1));
        assertThat(favoriteService.create(new FavoriteRequest(ARTICLE1.getId()), MEMBER1))
                .isEqualTo(1L);
    }

    @DisplayName("cancel 요청시 repository에 delete를 요청한다.")
    @Test
    void cancel() {
        favoriteService.delete(new FavoriteRequest(ARTICLE1.getId()), MEMBER1);

        verify(favoriteRepository).deleteByMemberIdAndArticleId(ARTICLE1.getId(), MEMBER1.getId());
    }

    @DisplayName("게시글에 해당되는 찜을 삭제한다.")
    @Test
    void deleteAllByArticleId() {
        favoriteService.deleteAllByArticleId(anyLong());

        verify(favoriteRepository).deleteAllByArticleId(anyLong());
    }
}
