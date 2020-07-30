/**
 * @author kouz95
 */

package sellerlee.back.article.fixture;

import static sellerlee.back.article.fixture.MemberFixture.*;
import static sellerlee.back.article.fixture.TagFixture.*;

import java.util.Arrays;
import java.util.Collections;

import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;

public class ArticleFixture {
    public static final Article ARTICLE1 = new Article(
            1L,
            "test title1",
            1234L,
            Category.PC,
            "test contents1",
            new Tags(Collections.emptyList()),
            MEMBER);

    public static final Article ARTICLE2 = new Article(
            2L,
            "test title1",
            1234L,
            Category.PC,
            "test contents1",
            new Tags(Collections.emptyList()),
            MEMBER);

    public static final Article ARTICLE3 = new Article(
            3L,
            "TEST_TITLE",
            10_000L,
            Category.PC,
            "TEST_CONTENTS",
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2)),
            MEMBER);

    public static final ArticleCreateRequest ARTICLE_CREATE_REQUEST_FIXTURE = new ArticleCreateRequest(
            "TEST_TITLE",
            10_000L,
            "디지털/가전",
            "TEST_CONTENTS",
            1L,
            "#TEST #TEST_TAG"
    );
}
