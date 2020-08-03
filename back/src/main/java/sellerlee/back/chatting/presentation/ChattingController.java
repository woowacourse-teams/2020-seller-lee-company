package sellerlee.back.chatting.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static sellerlee.back.chatting.presentation.ChattingController.CHATTING_URI;

@RestController
@RequestMapping(CHATTING_URI)
public class ChattingController {
    public static final String CHATTING_URI = "/chattings";
}
