/**
 * @author begaonnuri
 */

package sellerlee.back.article.fixture;

import static sellerlee.back.article.fixture.MemberFixture.*;
import static sellerlee.back.article.fixture.TagFixture.*;

import java.util.Arrays;
import java.util.Collections;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;

public class ArticleFixture {
    public static final Article ARTICLE1 = new Article(
            1L,
            MEMBER,
            "test title1",
            Category.TEST,
            1234L,
            "test contents1",
            new Tags(Collections.emptyList()));

    public static final Article ARTICLE2 = new Article(
            2L,
            MEMBER,
            "test title1",
            Category.TEST,
            1234L,
            "test contents1",
            new Tags(Collections.emptyList()));

    public static final Article ARTICLE3 = new Article(
            1L,
            MEMBER,
            "TEST_TITLE",
            Category.TEST,
            10_000L,
            "TEST_CONTENTS",
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2))
    );
}
