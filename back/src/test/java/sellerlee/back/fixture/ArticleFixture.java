/**
 * @author kouz95
 */
package sellerlee.back.fixture;

import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;

import java.util.Arrays;
import java.util.Collections;

import static sellerlee.back.fixture.MemberFixture.MEMBER1;
import static sellerlee.back.fixture.MemberFixture.MEMBER2;
import static sellerlee.back.fixture.TagFixture.TAG_FIXTURE;
import static sellerlee.back.fixture.TagFixture.TAG_FIXTURE2;

public class ArticleFixture {
    public static final Article ARTICLE_FIXTURE = new Article(
            "TEST_TITLE",
            10_000L,
            Category.BOOK,
            "TEST_CONTENTS",
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2)),
            Arrays.asList("testUri1", "testUri2"),
            MEMBER2
    );
    public static final Article ARTICLE1 = new Article(
            51L,
            "test title1",
            1234L,
            Category.PC,
            "test contents1",
            new Tags(Collections.emptyList()),
            Arrays.asList("testUri1", "testUri2"),
            MEMBER1);
    public static final Article ARTICLE2 = new Article(
            52L,
            "test title1",
            1234L,
            Category.PC,
            "test contents1",
            new Tags(Collections.emptyList()),
            Arrays.asList("testUri1", "testUri2"),
            MEMBER1);
    public static final Article ARTICLE3 = new Article(
        3L,
        "TEST_TITLE",
        10_000L,
        Category.PC,
        "TEST_CONTENTS",
        new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2)),
        Arrays.asList("testUri1", "testUri2"),
        MEMBER1);
    public static final ArticleCreateRequest ARTICLE_CREATE_REQUEST_FIXTURE = new ArticleCreateRequest(
        "TEST_TITLE",
        10_000L,
        "디지털/가전",
        "TEST_CONTENTS",
        Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2),
        Arrays.asList("testUri1", "testUri2"),
            MEMBER1.getId()
    );
}
