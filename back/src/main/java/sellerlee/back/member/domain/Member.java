/**
 * @author jnsorn
 */

package sellerlee.back.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    protected Member() {
    }

    public Member(Long id) {
        this.id = id;
    }
}
