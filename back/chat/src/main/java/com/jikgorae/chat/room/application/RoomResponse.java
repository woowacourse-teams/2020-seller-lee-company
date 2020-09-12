package com.jikgorae.chat.room.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.jikgorae.chat.room.domain.Room;

public class RoomResponse {
    private Long roomId;
    private String name;

    public RoomResponse(Long roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public static RoomResponse of(Room room) {
        return new RoomResponse(room.getRoomId(), room.getName());
    }

    public static List<RoomResponse> listOf(List<Room> rooms) {
        return rooms.stream()
                .map(RoomResponse::of)
                .collect(toList());
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getName() {
        return name;
    }
}