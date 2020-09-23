package com.jikgorae.api.article.domain;

import java.util.Arrays;

public enum TradeState {
    ON_SALE("판매중"),
    RESERVED("예약중"),
    COMPLETED("판매 완료");

    private final String tradeState;

    TradeState(String tradeState) {
        this.tradeState = tradeState;
    }

    public static TradeState fromString(String tradeState) {
        return Arrays.stream(values())
                .filter(v -> v.tradeState.equals(tradeState))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                String.format("잘못된 TradeState : %s.", tradeState)));
    }

    public boolean isCompleted() {
        return this == COMPLETED;
    }

    public String getTradeStateName() {
        return tradeState;
    }
}
