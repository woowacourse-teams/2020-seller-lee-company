/**
 * @author kouz95
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

    private String avatar;

    private String nickname;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String email, String password, String avatar, String nickname,
            Double score) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
        this.score = score;
    }

    public Member(String email, String password, String avatar, String nickname, Double score) {
        this(null, email, password, avatar, nickname, score);
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

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public Double getScore() {
        return score;
    }
}
