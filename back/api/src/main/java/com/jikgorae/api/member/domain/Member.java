package com.jikgorae.api.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String kakaoId;

    private String nickname;

    private String avatar;

    private String kakaoAccessToken;

    private String kakaoRefreshToken;

    @Enumerated(EnumType.STRING)
    private State state;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String kakaoId, String nickname, String avatar,
            String kakaoAccessToken, String kakaoRefreshToken, State state, Double score) {
        this.id = id;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.avatar = avatar;
        this.kakaoAccessToken = kakaoAccessToken;
        this.kakaoRefreshToken = kakaoRefreshToken;
        this.state = state;
        this.score = score;
    }

    public Member(String kakaoId, String nickname, String avatar, String kakaoAccessToken,
            String kakaoRefreshToken, State state, Double score) {
        this(null, kakaoId, nickname, avatar, kakaoAccessToken, kakaoRefreshToken, state, score);
    }

    public Member(Long id) {
        this(id, null, null, null, null, null, null, null);
    }

    public boolean isSameId(Member member) {
        return id.equals(member.id);
    }

    public Member login(String nickname, String avatar, String kakaoAccessToken,
            String kakaoRefreshToken) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.kakaoAccessToken = kakaoAccessToken;
        this.kakaoRefreshToken = kakaoRefreshToken;

        return this;
    }

    public void update(String nickname, String avatar) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.state = State.JOIN;
    }

    public void updateToken(String kakaoAccessToken, String kakaoRefreshToken) {
        this.kakaoAccessToken = kakaoAccessToken;
        this.kakaoRefreshToken = kakaoRefreshToken;
    }

    public void updateToken(String kakaoAccessToken) {
        updateToken(kakaoAccessToken, this.kakaoRefreshToken);
    }

    public Long getId() {
        return id;
    }

    public String getKakaoId() {
        return kakaoId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getKakaoAccessToken() {
        return kakaoAccessToken;
    }

    public String getKakaoRefreshToken() {
        return kakaoRefreshToken;
    }

    public State getState() {
        return state;
    }

    public Double getScore() {
        return score;
    }
}
