package sellerlee.back.member.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Member {
    @Id
    @GeneratedValue
    private Long id;
    private String email;

    protected Member() {
    }

    public Member(Long id) {
        this.id = id;
    }
}
