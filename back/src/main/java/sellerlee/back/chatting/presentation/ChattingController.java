package sellerlee.back.chatting.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sellerlee.back.chatting.application.ChattingService;

import java.net.URI;

import static sellerlee.back.chatting.presentation.ChattingController.CHATTING_URI;

@RestController
@RequestMapping(CHATTING_URI)
public class ChattingController {
    public static final String CHATTING_URI = "/chattings";

    private final ChattingService chattingService;

    public ChattingController(ChattingService chattingService) {
        this.chattingService = chattingService;
    }

    @PostMapping
    public ResponseEntity<Void> createChatting(
            @RequestParam Long articleId,
            @RequestParam Long buyerId) {
        Long chattingId = chattingService.create(articleId, buyerId);
        return ResponseEntity.created(URI.create(CHATTING_URI + "/" + chattingId)).build();
    }
}
