package sellerlee.back.article.application;

import sellerlee.back.member.domain.Member;

public class AuthorResponse {
    private String nickname;
    private String avatar;
    private Double score;

    private AuthorResponse() {
    }

    private AuthorResponse(String nickname, String avatar, Double score) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public static AuthorResponse of(Member member) {
        return new AuthorResponse(member.getNickname(), member.getAvatar(), member.getScore());
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
