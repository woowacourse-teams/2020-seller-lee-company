package sellerlee.back.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

    private String kakaoId;

    private String email;

    private String nickname;

    //todo deleted
    private String password;

    private String avatar;

    @Enumerated(EnumType.STRING)
    private State state;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String kakaoId, String email, String nickname, String password,
            String avatar, State state, Double score) {
        this.id = id;
        this.kakaoId = kakaoId;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.avatar = avatar;
        this.state = state;
        this.score = score;
    }

    public Member(String kakaoId, String email, String nickname, String password, String avatar,
            State state, Double score) {
        this(null, kakaoId, email, nickname, password, avatar, state, score);
    }

    public Member(String kakaoId, String email, String nickname, String password, String avatar,
            Double score) {
        this(null, kakaoId, email, nickname, password, avatar, null, score);
    }

    public Member(String nickname, String password, String avatar, Double score) {
        this(null, null, null, nickname, password, avatar, null, score);
    }

    public Member(String nickname, String password, String avatar) {
        this(null, null, null, nickname, password, avatar, null, null);
    }

    public Member(String password, String avatar) {
        this(null, null, null, null, password, avatar, null, null);
    }

    public Member(Long id) {
        this(id, null, null, null, null, null, null, null);
    }

    public Member updateNickName(String nickname) {
        this.nickname = nickname;
        this.state = State.EXISTING;

        return this;
    }

    public boolean verify(PasswordEncoder passwordEncoder, String password) {
        return passwordEncoder.matches(password, this.password);
    }

    public boolean isSameId(Member member) {
        return id.equals(member.id);
    }

    public boolean isSameNickname(String nickname) {
        return this.nickname.equals(nickname);
    }

    public void update(String nickname, String avatar) {
        this.nickname = nickname;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public String getKakaoId() {
        return kakaoId;
    }

    public String getEmail() {
        return email;
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

    public State getState() {
        return state;
    }

    public Double getScore() {
        return score;
    }
}
