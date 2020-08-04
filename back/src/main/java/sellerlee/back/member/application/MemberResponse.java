/**
 * @author kouz95
 */

package sellerlee.back.member.application;

import sellerlee.back.member.domain.Member;

public class MemberResponse {
    private Long id;
    private String avatar;
    private String nickname;
    private Double score;

    private MemberResponse() {
    }

    private MemberResponse(Long id, String avatar, String nickname, Double score) {
        this.id = id;
        this.avatar = avatar;
        this.nickname = nickname;
        this.score = score;
    }

    public static MemberResponse of(Member member) {
        return new MemberResponse(member.getId(), member.getAvatar(), member.getNickname(),
                member.getScore());
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
