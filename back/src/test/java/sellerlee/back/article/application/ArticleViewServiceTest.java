/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.MemberRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static sellerlee.back.fixture.ArticleFixture.ARTICLE1;
import static sellerlee.back.fixture.FavoriteFixture.FAVORITE;
import static sellerlee.back.fixture.MemberFixture.MEMBER2;

@ExtendWith(value = MockitoExtension.class)
class ArticleViewServiceTest {
    @Mock
    private MemberRepository memberRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private ArticleRepository articleRepository;

    private ArticleViewService articleViewService;

    @BeforeEach
    void setUp() {
        articleViewService = new ArticleViewService(articleRepository, memberRepository,
                favoriteRepository);
    }

    @DisplayName("Article 와 Member 를 가져온 후 객체들를 이용해 Favorite 객체를 가져온다")
    @Test
    void showArticle() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));
        when(memberRepository.findById(MEMBER2.getId())).thenReturn(Optional.of(MEMBER2));
        when(favoriteRepository.findFavoriteByArticleAndMember(any(), any())).thenReturn(
                Optional.of(FAVORITE));

        ArticleResponse articleResponse = articleViewService.showArticle(ARTICLE1.getId(),
                MEMBER2.getId());

        assertThat(articleResponse.getId()).isEqualTo(ARTICLE1.getId());
        assertThat(articleResponse.getAuthor().getEmail()).isEqualTo(
                ARTICLE1.getAuthor().getEmail());
        assertThat(articleResponse.getFavorite().getId()).isEqualTo(1L);
        assertThat(articleResponse.getFavorite().getMember().getId()).isEqualTo(MEMBER2.getId());
        assertThat(articleResponse.getFavorite().getMember().getEmail()).isEqualTo(
                "lxxjn0@gmail.com");
    }
}