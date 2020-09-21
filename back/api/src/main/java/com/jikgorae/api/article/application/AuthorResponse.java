package com.jikgorae.api.article.application;

import com.jikgorae.api.member.domain.Member;

public class AuthorResponse {
    private Long id;
    private String nickname;
    private String avatar;
    private String pushToken;
    private Double score;

    private AuthorResponse() {
    }

    private AuthorResponse(Long id, String nickname, String avatar, String pushToken,
            Double score) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.pushToken = pushToken;
        this.score = score;
    }

    public static AuthorResponse of(Member member) {
        return new AuthorResponse(member.getId(), member.getNickname(), member.getAvatar(),
                member.getPushToken(), member.getScore());
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
