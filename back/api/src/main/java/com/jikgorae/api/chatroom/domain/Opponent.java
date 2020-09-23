package com.jikgorae.api.chatroom.domain;

import com.jikgorae.api.member.domain.Member;

public class Opponent {
    private Long id;
    private String nickname;
    private String avatar;
    private String pushToken;

    private Opponent() {
    }

    public Opponent(Long id, String nickname, String avatar, String pushToken) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.pushToken = pushToken;
    }

    public static Opponent of(Member buyer, Member seller, Member loginMember) {
        if (loginMember.isSameId(buyer)) {
            return new Opponent(seller.getId(), seller.getNickname(), seller.getAvatar(), seller.getPushToken());
        }
        return new Opponent(buyer.getId(), buyer.getNickname(), buyer.getAvatar(),
                buyer.getPushToken());
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

    public String getPushToken() {
        return pushToken;
    }
}
