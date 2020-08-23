package sellerlee.back.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String nickname;

    private String password;

    private String avatar;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String nickname, String password, String avatar, Double score) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.avatar = avatar;
        this.score = score;
    }

    public Member(String nickname, String password, String avatar, Double score) {
        this(null, nickname, password, avatar, score);
    }

    public Member(String nickname, String password, String avatar) {
        this(null, nickname, password, avatar, null);
    }

    public Member(Long id) {
        this(id, null, null, null, null);
    }

    public boolean verify(PasswordEncoder passwordEncoder, String password) {
        return passwordEncoder.matches(password, this.password);
    }

    public boolean isNotEquals(Member member) {
        return !id.equals(member.id);
    }

    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

    public String getAvatar() {
        return avatar;
    }

    public Double getScore() {
        return score;
    }
}
