package com.jikgorae.chat.message.fixture;

import com.jikgorae.chat.message.application.MessageRequest;

public class MessageFixture {
    public static MessageRequest requestOf(Long roomId) {
        return new MessageRequest(roomId, 99L, "NICKNAME", "MESSAGE", "ExponentPushToken[1234567-12345678901234]");
    }
}
