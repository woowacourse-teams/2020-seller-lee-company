package sellerlee.back.fixture;

import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TagFixture.*;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.assertj.core.util.Lists;

import sellerlee.back.article.application.ArticleRequest;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Photos;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.article.domain.TradeState;

public class ArticleFixture {
    public static final Article ARTICLE1 = new Article(
            51L,
            "title1",
            Tags.of(TAG_FIXTURE1, TAG_FIXTURE2),
            Category.PC,
            "contents1",
            1234L,
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4"),
            MEMBER1,
            LocalDateTime.now(),
            LocalDateTime.now()
    );

    public static final Article ARTICLE2 = new Article(
            52L,
            "title2",
            Tags.of(TAG_FIXTURE3, TAG_FIXTURE4),
            Category.PC,
            "contents2",
            1234L,
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars2.githubusercontent.com/u/31095063?s=400&u=e10e5d42924c8443b43faf9e943ff8aa73d6c79d&v=4",
                    "https://avatars3.githubusercontent.com/u/52931057?s=400&u=e1a3a103fc54a423fd56ab6fafce748d360f3336&v=4"),
            MEMBER1,
            LocalDateTime.now(),
            LocalDateTime.now()
    );

    public static final Article ARTICLE3 = new Article(
            53L,
            "title3",
            new Tags(Lists.emptyList()),
            Category.PC,
            "contents3",
            1234L,
            TradeState.ON_SALE,
            Photos.of(
                    "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4"),
            MEMBER1,
            LocalDateTime.now(),
            LocalDateTime.now()
    );

    public static final ArticleRequest ARTICLE_REQUEST = new ArticleRequest(
            "TEST_TITLE",
            10_000L,
            "디지털/가전",
            "TEST_CONTENTS",
            Arrays.asList(TAG_FIXTURE1.getName(), TAG_FIXTURE2.getName()),
            Arrays.asList(
                    "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4",
                    "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4"),
            1L);
}
