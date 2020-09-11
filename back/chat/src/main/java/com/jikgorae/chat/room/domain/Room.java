package com.jikgorae.chat.room.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Room {
    @Id
    @GeneratedValue
    private Long roomId;

    private String name;

    protected Room() {
    }

    public Room(Long roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public Room(String name) {
        this(null, name);
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getName() {
        return name;
    }
}