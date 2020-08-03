/**
 * @author joseph415
 */

package sellerlee.back.article.fixture;

import static sellerlee.back.article.fixture.ArticleFixture.*;
import static sellerlee.back.article.fixture.MemberFixture.*;

import sellerlee.back.favorite.domain.Favorite;

public class FavoriteFixture {
    public static final Favorite FAVORITE = new Favorite(1L, ARTICLE1, MEMBER2);
}