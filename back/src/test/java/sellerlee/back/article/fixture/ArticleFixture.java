/**
 * @author kouz95
 */

package sellerlee.back.article.fixture;

import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

import java.util.Arrays;

import static sellerlee.back.article.fixture.TagFixture.TAG_FIXTURE;
import static sellerlee.back.article.fixture.TagFixture.TAG_FIXTURE2;

public class ArticleFixture {
    public static final Article ARTICLE_FIXTURE = new Article(
            "TEST_TITLE",
            10_000L,
            Category.PC,
            "TEST_CONTENTS",
            new Member(1L),
            new Tags(Arrays.asList(TAG_FIXTURE, TAG_FIXTURE2))
    );

    public static final ArticleCreateRequest ARTICLE_CREATE_REQUEST_FIXTURE = new ArticleCreateRequest(
            "TEST_TITLE",
            10_000L,
            "디지털/가전",
            "TEST_CONTENTS",
            1L,
            "#TEST #TEST_TAG"
    );
}
