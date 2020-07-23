/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

public class ArticleCreateRequest {
    private String title;
    private String category;
    private Long price;
    private String contents;
    private String url;
    private String tags;

    public ArticleCreateRequest(String title, String category, Long price, String contents,
            String url, String tags) {
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.url = url;
        this.tags = tags;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public Long getPrice() {
        return price;
    }

    public String getContents() {
        return contents;
    }

    public String getUrl() {
        return url;
    }

    public String getTags() {
        return tags;
    }
}
