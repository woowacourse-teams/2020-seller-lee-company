/**
 * @author kouz95
 */
package sellerlee.back.fixture;

import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TagFixture.*;

import java.util.Arrays;

import org.assertj.core.util.Lists;

import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Photos;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.article.domain.TradeType;

public class ArticleFixture {

    public static final Article
            ARTICLE1 = new Article(
            51L,
            "title1",
            Tags.of(TAG_FIXTURE1, TAG_FIXTURE2),
            Category.PC,
            "contents1",
            1234L,
            TradeType.DIRECT_TRANSACTION,
            "잠실동",
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4"),
            MEMBER1);

    public static final Article ARTICLE2 = new Article(
            52L,
            "title2",
            Tags.of(TAG_FIXTURE3, TAG_FIXTURE4),
            Category.PC,
            "contents2",
            1234L,
            TradeType.DELIVERY,
            null,
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars2.githubusercontent.com/u/31095063?s=400&u=e10e5d42924c8443b43faf9e943ff8aa73d6c79d&v=4",
                    "https://avatars3.githubusercontent.com/u/52931057?s=400&u=e1a3a103fc54a423fd56ab6fafce748d360f3336&v=4"),
            MEMBER1);

    public static final Article ARTICLE3 = new Article(
            53L,
            "title3",
            new Tags(Lists.emptyList()),
            Category.PC,
            "contents3",
            1234L,
            TradeType.DIRECT_TRANSACTION,
            "잠실동",
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4"),
            MEMBER1);

    public static final ArticleCreateRequest ARTICLE_CREATE_REQUEST_FIXTURE = new ArticleCreateRequest(
            "title",
            Arrays.asList(TAG_FIXTURE1, TAG_FIXTURE2),
            "디지털/가전",
            "contents",
            10_000L,
            "직거래",
            "잠실동",
            Arrays.asList(
                    "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4"),
            MEMBER2.getId());
}
