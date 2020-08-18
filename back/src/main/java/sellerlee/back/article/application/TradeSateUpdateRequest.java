package sellerlee.back.article.application;

public class TradeSateUpdateRequest {
    private Long id;
    private String tradeState;

    private TradeSateUpdateRequest() {
    }

    public TradeSateUpdateRequest(Long id, String tradeState) {
        this.id = id;
        this.tradeState = tradeState;
    }

    public Long getId() {
        return id;
    }

    public String getTradeState() {
        return tradeState;
    }
}
