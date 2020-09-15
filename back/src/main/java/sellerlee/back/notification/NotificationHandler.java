package sellerlee.back.notification;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushMessageTicketPair;
import io.github.jav.exposerversdk.ExpoPushReceipt;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;

public class NotificationHandler {
    private final String senderNickname;
    private final String pushToken;
    private final NotificationType notificationType;

    public NotificationHandler(String senderNickname, String pushToken,
            NotificationType notificationType) {
        this.senderNickname = senderNickname;
        validatePushToken(pushToken);
        this.pushToken = pushToken;
        this.notificationType = notificationType;
    }

    private void validatePushToken(String pushToken) {
        if (!PushClient.isExponentPushToken(pushToken))
            throw new IllegalArgumentException("토큰이 유효하지 않습니다. : " + pushToken);
    }

    public void send() {
        try {
            sendMessage();
        } catch (PushClientException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void sendMessage() throws
            PushClientException,
            ExecutionException,
            InterruptedException {
        ExpoPushMessage expoPushMessage = getExpoPushMessage();

        List<ExpoPushMessage> expoPushMessages = Collections.singletonList(expoPushMessage);
        PushClient client = new PushClient();
        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

        List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();
        chunks.forEach(c -> messageRepliesFutures.add(client.sendPushNotificationsAsync(c)));

        // Wait for each completable future to finish
        List<ExpoPushTicket> allTickets = new ArrayList<>();
        for (CompletableFuture<List<ExpoPushTicket>> messageReplyFuture : messageRepliesFutures) {
            allTickets.addAll(messageReplyFuture.get());
        }

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> zippedMessagesTickets = client.zipMessagesTickets(
                expoPushMessages, allTickets);

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> okTicketMessages = client.filterAllSuccessfulMessages(
                zippedMessagesTickets);
        String okTicketMessagesString = okTicketMessages.stream().map(
                p -> "Title: " + p.message.getTitle() + ", Id:" + p.ticket.getId()
        ).collect(Collectors.joining(","));
        System.out.println(
                "Recieved OK ticket for " +
                        okTicketMessages.size() +
                        " messages: " + okTicketMessagesString
        );

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> errorTicketMessages = client.filterAllMessagesWithError(
                zippedMessagesTickets);
        String errorTicketMessagesString = errorTicketMessages.stream().map(
                p -> "Title: " + p.message.getTitle() + ", Error: " + p.ticket.getDetails()
                        .getError()
        ).collect(Collectors.joining(","));
        System.out.println(
                "Recieved ERROR ticket for " +
                        errorTicketMessages.size() +
                        " messages: " +
                        errorTicketMessagesString
        );

        // Countdown 30s
        int wait = 30;
        for (int i = wait; i >= 0; i--) {
            System.out.print("Waiting for " + wait + " seconds. " + i + "s\r");
            Thread.sleep(1000);
        }
        System.out.println("Fetching receipts...");

        List<String> ticketIds = (client.getTicketIdsFromPairs(okTicketMessages));
        CompletableFuture<List<ExpoPushReceipt>> receiptFutures
                = client.getPushNotificationReceiptsAsync(ticketIds);

        List<ExpoPushReceipt> receipts = receiptFutures.get();

        System.out.println("Received " + receipts.size() + " receipts:");

        for (ExpoPushReceipt reciept : receipts) {
            System.out.println(
                    "Receipt for id: " + reciept.getId() + " had status: " + reciept.getStatus());

        }
    }

    private ExpoPushMessage getExpoPushMessage() {
        ExpoPushMessage expoPushMessage = new ExpoPushMessage(pushToken);
        expoPushMessage.setBody(notificationType.concat(senderNickname));
        return expoPushMessage;
    }
}
