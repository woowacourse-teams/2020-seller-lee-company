package sellerlee.back.member.application;

import sellerlee.back.member.domain.Member;

public class ProfileResponse {
    private String nickname;
    private String avatar;
    private Double score;

    private ProfileResponse() {
    }

    public ProfileResponse(String nickname, String avatar, Double score) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public static ProfileResponse of(Member member) {
        return new ProfileResponse(
                member.getNickname(),
                member.getAvatar(),
                member.getScore()
        );
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
