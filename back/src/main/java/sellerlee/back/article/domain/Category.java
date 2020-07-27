/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import java.util.Arrays;

public enum Category {
    PC("디지털/가전"),
    BOOK("도서");

    private final String category;

    Category(String category) {
        this.category = category;
    }

    public static Category of(String type) {
        return Arrays.stream(values())
                .filter(v -> v.category.equals(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(String.format("잘못된 카테고리 : %s.", type)));
    }
}
