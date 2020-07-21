/**
 * @author kouz95
 */

package sellerlee.back.article.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Tag {
    @Column
    private String name;

    public Tag() {
    }
}
