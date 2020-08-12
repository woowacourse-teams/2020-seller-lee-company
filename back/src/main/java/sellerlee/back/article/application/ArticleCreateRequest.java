/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Photos;
import sellerlee.back.article.domain.Tag;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.member.domain.Member;

public class ArticleCreateRequest {
    private String title;
    private List<Tag> tags;
    private String category;
    private String contents;
    private Long price;
    private List<String> photos;
    private Long authorId;

    private ArticleCreateRequest() {
    }

    public ArticleCreateRequest(String title, List<Tag> tags, String category,
            String contents, Long price, List<String> photos, Long authorId) {
        this.title = title;
        this.tags = tags;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.photos = photos;
        this.authorId = authorId;
    }

    public Article toArticle() {
        return new Article(
                title,
                new Tags(tags),
                Category.fromString(category),
                contents,
                price,
                TradeState.ON_SALE,
                new Photos(photos),
                new Member(authorId));
    }

    public String getTitle() {
        return title;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public String getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public Long getAuthorId() {
        return authorId;
    }
}
