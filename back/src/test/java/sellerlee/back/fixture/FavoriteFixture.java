package sellerlee.back.fixture;

import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import sellerlee.back.favorite.domain.Favorite;

public class FavoriteFixture {
    public static final Favorite FAVORITE1 = new Favorite(51L, ARTICLE1, MEMBER1);
    public static final Favorite FAVORITE2 = new Favorite(52L, ARTICLE2, MEMBER2);
}
