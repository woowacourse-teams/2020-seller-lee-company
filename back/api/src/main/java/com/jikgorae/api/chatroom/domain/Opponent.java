package com.jikgorae.api.chatroom.domain;

import com.jikgorae.api.member.domain.Member;

public class Opponent {
    private Long id;
    private String nickname;
    private String avatar;

    private Opponent() {
    }

    public Opponent(Long id, String nickname, String avatar) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
    }

    public static Opponent of(Member buyer, Member seller, Member loginMember) {
        if (loginMember.isSameId(buyer)) {
            return new Opponent(seller.getId(), seller.getNickname(), seller.getAvatar());
        }
        return new Opponent(buyer.getId(), buyer.getNickname(), buyer.getAvatar());
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
}
