package sellerlee.back.article.application;

import sellerlee.back.member.domain.Member;

public class AuthorResponse {
    private Long id;
    private String avatar;
    private String nickname;
    private Double score;

    private AuthorResponse() {
    }

    private AuthorResponse(String avatar, String nickname, Double score) {
        this.avatar = avatar;
        this.nickname = nickname;
        this.score = score;
    }

    public static AuthorResponse of(Member member) {
        return new AuthorResponse(member.getAvatar(), member.getNickname(), member.getScore());
    }

    public Long getId() {
        return id;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public Double getScore() {
        return score;
    }
}
