package com.jikgorae.api.member.application;

import com.jikgorae.common.member.domain.Member;

public class ProfileResponse {
    private String nickname;
    private String avatar;
    private String state;
    private Double score;

    private ProfileResponse() {
    }

    public ProfileResponse(String nickname, String avatar, String state, Double score) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.state = state;
        this.score = score;
    }

    public static ProfileResponse of(Member member) {
        return new ProfileResponse(
                member.getNickname(),
                member.getAvatar(),
                member.getState().name(),
                member.getScore()
        );
    }

    public String getNickname() {
        return nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getState() {
        return state;
    }

    public Double getScore() {
        return score;
    }
}
