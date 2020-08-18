package sellerlee.back.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import sellerlee.back.member.domain.IllegalLoginException;

@ControllerAdvice
public class LoginAdviceController {
    @ExceptionHandler(IllegalLoginException.class)
    public ResponseEntity<String> handleIllegalMemberLoginException(IllegalLoginException e) {
        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}
