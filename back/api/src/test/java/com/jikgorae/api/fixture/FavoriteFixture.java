package com.jikgorae.api.fixture;

import com.jikgorae.api.favorite.domain.Favorite;

public class FavoriteFixture {
    public static final Favorite FAVORITE1 = new Favorite(51L, ArticleFixture.ARTICLE1, MemberFixture.MEMBER1);
    public static final Favorite FAVORITE2 = new Favorite(52L, ArticleFixture.ARTICLE2, MemberFixture.MEMBER2);
}
