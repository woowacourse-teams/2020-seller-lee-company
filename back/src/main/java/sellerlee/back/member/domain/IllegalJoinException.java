package sellerlee.back.member.domain;

public class IllegalJoinException extends RuntimeException {
    public IllegalJoinException() {
    }

    public IllegalJoinException(String message) {
        super(message);
    }
}
