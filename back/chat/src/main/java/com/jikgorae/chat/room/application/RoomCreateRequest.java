package com.jikgorae.chat.room.application;

public class RoomCreateRequest {
    private Long sellerId;

    public RoomCreateRequest() {}

    public RoomCreateRequest(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Long getSellerId() {
        return sellerId;
    }
}
