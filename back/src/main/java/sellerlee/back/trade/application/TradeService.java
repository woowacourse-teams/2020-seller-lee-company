package sellerlee.back.trade.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import org.springframework.stereotype.Service;

import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.trade.domain.Trade;
import sellerlee.back.trade.domain.TradeRepository;

@Service
public class TradeService {
    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public List<ArticleCardResponse> showAll(Member buyer) {
        return tradeRepository.findAllByBuyer(buyer)
                .stream()
                .map(Trade::getArticle)
                .collect(collectingAndThen(toList(), ArticleCardResponse::listOf));
    }
}
