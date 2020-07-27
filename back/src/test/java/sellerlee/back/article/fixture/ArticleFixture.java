/**
 * @author kouz95
 */

package sellerlee.back.article.fixture;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

import java.util.Arrays;

import static sellerlee.back.article.fixture.TagFixture.TAG_FIXTURE;
import static sellerlee.back.article.fixture.TagFixture.TAG_FIXTURE2;

public class ArticleFixture {
    public static final Article ARTICLE_FIXTURE = new Article(
            new Member(1L),
            "TEST_TITLE",
            Category.TEST,
            10_000L,
            "TEST_CONTENTS",
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2))
    );
}
