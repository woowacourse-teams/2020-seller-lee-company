package com.jikgorae.chat.room.presentation;

import static com.jikgorae.chat.room.presentation.RoomController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.chat.room.application.RoomResponse;
import com.jikgorae.chat.room.application.RoomService;

@RestController
@RequestMapping(ROOM_URI)
public class RoomController {
    public static final String ROOM_URI = "/chat/rooms";

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> showAll() {
        return ResponseEntity.ok(roomService.showAll());
    }

    @PostMapping
    public ResponseEntity<Void> createRoom(@RequestParam String name) {
        Long roomId = roomService.create(name);
        return ResponseEntity.created(URI.create(ROOM_URI + "/" + roomId)).build();
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> show(@PathVariable Long roomId) {
        return ResponseEntity.ok(roomService.show(roomId));
    }
}