package sellerlee.back.trade.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TradeFixture.*;

import java.util.List;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.article.domain.Article;
import sellerlee.back.trade.domain.TradeRepository;
// TODO: 2020/08/25 Trade 현재 구현 안됨
// @ExtendWith(MockitoExtension.class)
// class TradeServiceTest {
//     @Mock
//     private TradeRepository tradeRepository;
//
//     private TradeService tradeService;
//
//     @BeforeEach
//     void setUp() {
//         tradeService = new TradeService(tradeRepository);
//     }
//
//     @DisplayName("접속한 사용자가 구매한 구매 내역을 가져온 후, 해당하는 게시글들의 목록을 반환한다.")
//     @Test
//     void showAll() {
//         List<Article> articles = Lists.newArrayList(ARTICLE1, ARTICLE2, ARTICLE3);
//         List<ArticleCardResponse> articleCardResponses = Lists.newArrayList(
//                 ArticleCardResponse.listOf(articles));
//
//         when(tradeRepository.findAllByBuyer(MEMBER1))
//                 .thenReturn(Lists.newArrayList(TRADE1, TRADE2, TRADE3));
//         List<ArticleCardResponse> expected = tradeService.showAll(MEMBER1);
//
//         assertThat(articleCardResponses.get(0).getTitle()).isEqualTo(expected.get(0).getTitle());
//         assertThat(articleCardResponses.get(1).getTitle()).isEqualTo(expected.get(1).getTitle());
//     }
// }
