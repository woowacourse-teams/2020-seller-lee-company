package com.jikgorae.api.trade.application;

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
