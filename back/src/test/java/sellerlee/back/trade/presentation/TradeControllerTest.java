package sellerlee.back.trade.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.context.TokenSecurityInterceptorTest.*;
import static sellerlee.back.trade.presentation.TradeController.*;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import sellerlee.back.ControllerTest;
import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.trade.application.TradeService;

@WebMvcTest(controllers = TradeController.class)
class TradeControllerTest extends ControllerTest {
    @MockBean
    private TradeService tradeService;

    @DisplayName("거래 완료 게시글 요청 시 필요한 정보를 담은 목록을 반환한다.")
    @Test
    void showAll() throws Exception {
        when(tradeService.showAll(any())).thenReturn(
                ArticleCardResponse.listOf(Arrays.asList(ARTICLE1, ARTICLE2, ARTICLE3)));

        // @formatter:off
        mockMvc
                .perform(
                        get(ORDER_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk());
        // @formatter:on
    }
}
