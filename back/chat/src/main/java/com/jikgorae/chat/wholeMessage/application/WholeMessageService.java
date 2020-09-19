package com.jikgorae.chat.wholeMessage.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.jikgorae.chat.wholeMessage.domain.WholeMessage;
import com.jikgorae.chat.wholeMessage.domain.WholeMessageRepository;

@Service
public class WholeMessageService {
    private final WholeMessageRepository wholeMessageRepository;

    public WholeMessageService(WholeMessageRepository wholeMessageRepository) {
        this.wholeMessageRepository = wholeMessageRepository;
    }

    public WholeMessageResponse save(WholeMessageRequest request) {
        WholeMessage save = wholeMessageRepository.save(request.toWholeMessage());
        return WholeMessageResponse.of(save);
    }

    public List<WholeMessageResponse> showAll(Long organizationId, int size, String date) {
        return WholeMessageResponse.listOf(
                wholeMessageRepository.findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(
                        organizationId, LocalDateTime.parse(date), PageRequest.of(0, size)));
    }
}
