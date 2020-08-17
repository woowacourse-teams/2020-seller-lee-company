package sellerlee.back.trade.presentation;

import static sellerlee.back.trade.presentation.TradeController.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.trade.application.TradeService;

@RequestMapping(ORDER_URI)
@RestController
public class TradeController {
    public static final String ORDER_URI = "/trades";

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleCardResponse>> showAll() {
        // TODO: 2020/08/06 아래의 Member는 추후 Login 기능 구현으로 @LoginMember resolver로 대체될 예정
        List<ArticleCardResponse> orders = tradeService.showAll(
                new Member(
                        51L,
                        "turtle@woowabro.com",
                        "1234",
                        "testNickname",
                        "testUri",
                        4.5));

        return ResponseEntity
                .ok()
                .body(orders);
    }
}
