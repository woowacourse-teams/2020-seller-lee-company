package sellerlee.back.member.application;

import sellerlee.back.member.domain.Member;

public class MyInfoResponse {
    private String nickname;
    private String avatar;
    private Double score;

    private MyInfoResponse() {
    }

    public MyInfoResponse(String nickname, String avatar, Double score) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.score = score;
    }

    public static MyInfoResponse of(Member member) {
        return new MyInfoResponse(
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
