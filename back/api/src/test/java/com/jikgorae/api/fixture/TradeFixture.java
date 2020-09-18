package com.jikgorae.api.fixture;

import com.jikgorae.api.trade.domain.Trade;

public class TradeFixture {
    public static Trade TRADE1 = new Trade(51L, ArticleFixture.ARTICLE1, MemberFixture.MEMBER1,
            MemberFixture.MEMBER2);
    public static Trade TRADE2 = new Trade(52L, ArticleFixture.ARTICLE2, MemberFixture.MEMBER1,
            MemberFixture.MEMBER2);
    public static Trade TRADE3 = new Trade(53L, ArticleFixture.ARTICLE3, MemberFixture.MEMBER2,
            MemberFixture.MEMBER1);
}
