package com.jikgorae.chat.room.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.jikgorae.chat.room.domain.Room;

public class RoomResponse {
    private Long roomId;
    private Long sellerId;
    private Long buyerId;

    public RoomResponse(Long roomId, Long sellerId, Long buyerId) {
        this.roomId = roomId;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }

    public static RoomResponse of(Room room) {
        return new RoomResponse(room.getId(), room.getSellerId(), room.getBuyerId());
    }

    public static List<RoomResponse> listOf(List<Room> rooms) {
        return rooms.stream()
                .map(RoomResponse::of)
                .collect(toList());
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public Long getBuyerId() {
        return buyerId;
    }
}