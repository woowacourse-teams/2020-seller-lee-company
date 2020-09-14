package com.jikgorae.api.article.application;

import com.jikgorae.api.member.domain.Member;

public class AuthorResponse {
    private Long id;
    private String nickname;
    private String avatar;
    private Double score;

    private AuthorResponse() {
    }

    private AuthorResponse(Long id, String nickname, String avatar, Double score) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public static AuthorResponse of(Member member) {
        return new AuthorResponse(member.getId(), member.getNickname(), member.getAvatar(), member.getScore());
    }

    public Long getId() {
        return id;
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
