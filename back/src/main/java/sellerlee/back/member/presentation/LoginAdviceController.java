package sellerlee.back.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import sellerlee.back.member.domain.IllegalMemberLoginException;

@ControllerAdvice
public class LoginAdviceController {
    @ExceptionHandler(IllegalMemberLoginException.class)
    public ResponseEntity<String> handleIllegalMemberLoginException(IllegalMemberLoginException e) {
        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}
