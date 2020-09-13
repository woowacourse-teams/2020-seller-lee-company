package com.jikgorae.chat.room.application;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.room.domain.Room;
import com.jikgorae.chat.room.domain.RoomRepository;
import com.jikgorae.common.member.domain.Member;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Long create(RoomCreateRequest request, Long buyerId) {
        return roomRepository.save(new Room(request.getSellerId(), buyerId)).getId();
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