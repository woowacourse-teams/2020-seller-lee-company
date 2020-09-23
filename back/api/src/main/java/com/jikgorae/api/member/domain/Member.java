package com.jikgorae.api.member.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.common.base.Strings;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String kakaoId;

    private String nickname;

    private String avatar;

    private String role;

    private Double score;

    private String pushToken;

    protected Member() {
    }

    public Member(Long id, String kakaoId, String nickname, String avatar, String role,
            Double score, String pushToken) {
        this.id = id;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.avatar = avatar;
        this.role = role;
        this.score = score;
        this.pushToken = pushToken;
    }

    public Member(String kakaoId, String nickname, String avatar, String role, Double score,
            String pushToken) {
        this(null, kakaoId, nickname, avatar, role, score, pushToken);
    }

    public Member(Long id) {
        this(id, null, null, null, null, null, null);
    }

    public boolean isSameId(Member member) {
        return id.equals(member.id);
    }

    public boolean isNotSameId(Member member) {
        return !isSameId(member);
    }

    public boolean isSameNickname(String nickname) {
        if (Objects.isNull(this.nickname)) {
            return false;
        }
        return this.nickname.equals(nickname);
    }

    public void update(String nickname, String avatar) {
        this.nickname = nickname;
        this.avatar = avatar;
    }

    public void updatePushToken(String pushToken) {
        this.pushToken = pushToken;
    }

    public void addRole(String role) {
        this.role = role;
    }

    public boolean hasNotRole() {
        return Strings.isNullOrEmpty(role);
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

    public String getRole() {
        return role;
    }

    public Double getScore() {
        return score;
    }

    public String getPushToken() {
        return pushToken;
    }
}
