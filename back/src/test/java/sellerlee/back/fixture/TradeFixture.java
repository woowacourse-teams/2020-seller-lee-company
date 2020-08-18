package sellerlee.back.fixture;

import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import sellerlee.back.trade.domain.Trade;

public class TradeFixture {
    public static Trade TRADE1 = new Trade(51L, ARTICLE1, MEMBER1, MEMBER2);
    public static Trade TRADE2 = new Trade(52L, ARTICLE2, MEMBER1, MEMBER2);
    public static Trade TRADE3 = new Trade(53L, ARTICLE3, MEMBER2, MEMBER1);
}
