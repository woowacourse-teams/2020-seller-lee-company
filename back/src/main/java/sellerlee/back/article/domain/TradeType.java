/**
 * @author joseph415
 */

package sellerlee.back.article.domain;

public enum TradeType {
    DIRECT_TRANSACTION("직거래"),
    DELEVERY("택배");

    private final String tradeType;

    TradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public String getTradeType() {
        return tradeType;
    }
}
