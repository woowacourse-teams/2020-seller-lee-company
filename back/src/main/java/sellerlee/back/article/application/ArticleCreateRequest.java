/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tag;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

public class ArticleCreateRequest {
    private String title;
    private Long price;
    private String category;
    private String contents;
    private List<Tag> tags;
    private List<String> photos;
    private Long authorId;

    private ArticleCreateRequest() {
    }

    public ArticleCreateRequest(String title, Long price, String category, String contents,
            List<Tag> tags, List<String> photos, Long authorId) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.tags = tags;
        this.photos = photos;
        this.authorId = authorId;
    }

    public Article toArticle() {
        return new Article(title, price, Category.fromName(category), contents,
                new Tags(tags), photos, new Member(authorId, "sellerlee@gmail.com", "0000", 4.5));
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public Long getAuthorId() {
        return authorId;
    }
}
