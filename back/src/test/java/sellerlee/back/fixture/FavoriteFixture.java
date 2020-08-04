/**
 * @author joseph415
 */

package sellerlee.back.fixture;

import sellerlee.back.favorite.domain.Favorite;

import static sellerlee.back.fixture.ArticleFixture.ARTICLE1;
import static sellerlee.back.fixture.MemberFixture.MEMBER2;

public class FavoriteFixture {
    public static final Favorite FAVORITE = new Favorite(1L, ARTICLE1, MEMBER2);
}
