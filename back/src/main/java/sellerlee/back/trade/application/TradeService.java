package sellerlee.back.trade.application;

import org.springframework.stereotype.Service;

import sellerlee.back.trade.domain.TradeRepository;

@Service
public class TradeService {
    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    // TODO: 2020/08/25 현재 Trade 사용 하지 않음
    // public List<ArticleCardResponse> showAll(Member buyer) {
    //     return tradeRepository.findAllByBuyer(buyer)
    //             .stream()
    //             .map(Trade::getArticle)
    //             .collect(collectingAndThen(toList(), ArticleCardResponse::listOf));
    // }
}
