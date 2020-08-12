/**
 * @author kouz95
 */

package sellerlee.back.favorite.application;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.Member;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public Long create(FavoriteRequest request, Member loginMember) {
        Favorite favorite = favoriteRepository
                .save(new Favorite(new Article(request.getArticleId()), loginMember).create());

        return favorite.getId();
    }

    @Transactional
    public void cancel(FavoriteRequest request, Member loginMember) {
        favoriteRepository.save(
                new Favorite(new Article(request.getArticleId()), loginMember).cancel());
        favoriteRepository.deleteByMemberIdAndArticleId(loginMember.getId(),
                request.getArticleId());
    }
}
