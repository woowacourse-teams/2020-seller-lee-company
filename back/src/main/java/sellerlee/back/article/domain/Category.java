/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import java.util.Arrays;

public enum Category {
    PC("디지털/가전"),
    BOOK("도서");

    private final String name;

    Category(String name) {
        this.name = name;
    }

    public static Category fromName(String category) {
        return Arrays.stream(values())
                .filter(v -> v.name.equals(category))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        String.format("잘못된 카테고리 : %s.", category)));
    }
}
