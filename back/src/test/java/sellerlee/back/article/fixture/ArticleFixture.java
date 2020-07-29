/**
 * @author kouz95
 */

package sellerlee.back.article.fixture;

import static sellerlee.back.article.fixture.TagFixture.*;

import java.util.Arrays;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

public class ArticleFixture {
    public static final Article ARTICLE_FIXTURE = new Article(
            new Member(1L, "sellerlee@woowacourse.com", "1234", 4.5),
            "TEST_TITLE",
            Category.TEST,
            10_000L,
            "TEST_CONTENTS",
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2))
    );
}
