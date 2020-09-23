package com.jikgorae.common.notification.infra;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.jikgorae.common.notification.domain.PushToken;
import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;

/**
 * expo-server-sdk를 사용해 구현 후 리팩토링
 * @see <a href="https://github.com/jav/expo-server-sdk-java">expo-server-sdk</a>
 */
@Component
public class NotificationSupport {
    private static final Logger log = LoggerFactory.getLogger(NotificationSupport.class);

    public void send(PushToken token, String message) {
        try {
            sendMessage(token, message);
        } catch (PushClientException e) {
            log.warn(e.getMessage());
        }
    }

    private void sendMessage(PushToken token, String message) throws PushClientException {
        ExpoPushMessage expoPushMessage = getExpoPushMessage(token, message);
        List<ExpoPushMessage> expoPushMessages = Collections.singletonList(expoPushMessage);

        PushClient client = new PushClient();
        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

        List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();
        chunks.forEach(c -> messageRepliesFutures.add(client.sendPushNotificationsAsync(c)));
    }

    private ExpoPushMessage getExpoPushMessage(PushToken token, String message) {
        ExpoPushMessage expoPushMessage = new ExpoPushMessage(token.getToken());
        expoPushMessage.setBody(message);
        return expoPushMessage;
    }
}
