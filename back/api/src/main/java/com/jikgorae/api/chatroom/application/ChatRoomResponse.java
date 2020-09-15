package com.jikgorae.api.chatroom.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.jikgorae.api.chatroom.domain.Opponent;
import com.jikgorae.api.chatroom.query.ChatRoomInfo;
import com.jikgorae.api.member.domain.Member;

public class ChatRoomResponse {
    private Long id;
    private ArticleInfo articleInfo;
    private Opponent opponent;

    public ChatRoomResponse(Long id, ArticleInfo articleInfo,
            Opponent opponent) {
        this.id = id;
        this.articleInfo = articleInfo;
        this.opponent = opponent;
    }

    public static ChatRoomResponse of(ChatRoomInfo chatRoomInfo, Member loginMember) {
        return new ChatRoomResponse(chatRoomInfo.getId(), chatRoomInfo.getArticleInfo(),
                Opponent.of(chatRoomInfo.getBuyer(), chatRoomInfo.getSeller(), loginMember));
    }

    public static List<ChatRoomResponse> listOf(List<ChatRoomInfo> chatRoomInfos,
            Member loginMember) {
        return chatRoomInfos.stream()
                .map(chatRoomInfo -> ChatRoomResponse.of(chatRoomInfo, loginMember))
                .collect(toList());
    }

    public Long getId() {
        return id;
    }

    public ArticleInfo getArticleInfo() {
        return articleInfo;
    }

    public Opponent getOpponent() {
        return opponent;
    }
}
