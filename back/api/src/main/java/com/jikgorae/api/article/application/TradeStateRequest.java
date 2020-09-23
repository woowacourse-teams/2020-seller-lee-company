package com.jikgorae.api.article.application;

public class TradeStateRequest {
    private String tradeState;

    private TradeStateRequest() {
    }

    public TradeStateRequest(String tradeState) {
        this.tradeState = tradeState;
    }

    public String getTradeState() {
        return tradeState;
    }
}
