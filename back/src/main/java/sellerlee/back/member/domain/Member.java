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

    private String email;

    private String password;

    private String nickname;

    private String avatar;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String email, String password, String nickname, String avatar,
            Double score) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public Member(String email, String password, String nickname, String avatar, Double score) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public Member(Long id) {
        this(id, null, null, null, null, null);
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

    public String getNickname() {
        return nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public Double getScore() {
        return score;
    }
}
