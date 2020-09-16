package com.jikgorae.api.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
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

    private String role;

    private Double score;

    protected Member() {
    }

    public Member(Long id, String kakaoId, String nickname, String avatar,
            String role, Double score) {
        this.id = id;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.avatar = avatar;
        this.role = role;
        this.score = score;
    }

    public Member(String kakaoId, String nickname, String avatar, String role, Double score) {
        this(null, kakaoId, nickname, avatar, role, score);
    }

    public Member(Long id) {
        this(id, null, null, null, null, null);
    }

    public boolean isNotSameId(Member member) {
        return !id.equals(member.id);
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
}
