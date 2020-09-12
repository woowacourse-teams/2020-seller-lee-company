package com.jikgorae.chat.room.application;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.room.domain.Room;
import com.jikgorae.chat.room.domain.RoomRepository;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Long create(String name) {
        return roomRepository.save(new Room(name)).getRoomId();
    }

    public List<RoomResponse> showAll() {
        List<Room> rooms = roomRepository.findAll();
        return RoomResponse.listOf(rooms);
    }

    public RoomResponse show(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(NoSuchElementException::new);
        return RoomResponse.of(room);
    }
}