/**
 * @author kouz95
 */

package sellerlee.back.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String email, String password, Double score) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.score = score;
    }

    public Member(String email, String password, Double score) {
        this(null, email, password, score);
    }

    public boolean verify(String password) {
        return this.password.equals(password);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Double getScore() {
        return score;
    }
}
