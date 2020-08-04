/**
 * @author joseph415
 */

package sellerlee.back.article.domain;

import java.util.Arrays;
import java.util.NoSuchElementException;

public enum TradeType {
    DIRECT_TRANSACTION("직거래"),
    DELEVERY("택배");

    private final String tradeType;

    TradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public static TradeType fromString(String tradeType) {
        return Arrays.stream(values())
                .filter(value -> value.tradeType.equals(tradeType))
                .findAny()
                .orElseThrow(() -> new NoSuchElementException("이름에 해당하는 거래 타입이 존재하지 않습니다."));
    }

    public String getTradeType() {
        return tradeType;
    }
}
