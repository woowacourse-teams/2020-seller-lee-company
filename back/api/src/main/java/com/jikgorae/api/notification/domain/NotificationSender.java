package com.jikgorae.api.notification.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Component;

import com.jikgorae.api.notification.application.NotificationEvent;
import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;

/**
 * expo-server-sdk를 사용해 구현 후 리팩토링
 * @see <a href="https://github.com/jav/expo-server-sdk-java">expo-server-sdk</a>
 */
@Component
public class NotificationSender {
    public void send(NotificationEvent event) {
        try {
            sendMessage(event);
        } catch (PushClientException e) {
            e.printStackTrace();
        }
    }

    private void sendMessage(NotificationEvent event) throws PushClientException {
        ExpoPushMessage expoPushMessage = getExpoPushMessage(event);
        List<ExpoPushMessage> expoPushMessages = Collections.singletonList(expoPushMessage);

        PushClient client = new PushClient();
        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

        List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();
        chunks.forEach(c -> messageRepliesFutures.add(client.sendPushNotificationsAsync(c)));
    }

    private ExpoPushMessage getExpoPushMessage(NotificationEvent event) {
        ExpoPushMessage expoPushMessage = new ExpoPushMessage(event.getPushToken().getToken());
        expoPushMessage.setBody(event.makeMessage());
        return expoPushMessage;
    }
}
