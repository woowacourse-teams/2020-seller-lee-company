package com.jikgorae.api.member.application;

public class PushTokenRequest {
    private String pushToken;

    private PushTokenRequest() {
    }

    public PushTokenRequest(String pushToken) {
        this.pushToken = pushToken;
    }

    public String getPushToken() {
        return pushToken;
    }
}
