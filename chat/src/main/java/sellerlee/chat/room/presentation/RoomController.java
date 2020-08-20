package sellerlee.chat.room.presentation;

import static sellerlee.chat.room.presentation.RoomController.*;

import org.springframework.web.bind.annotation.*;

import sellerlee.chat.room.domain.RoomRepository;

@RestController
@RequestMapping(ROOM_URI)
public class RoomController {
    public static final String ROOM_URI = "/chat/rooms";

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
}