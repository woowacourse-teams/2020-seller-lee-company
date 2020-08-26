package sellerlee.back.member.domain;

public class IllegalLoginException extends IllegalArgumentException {
    public IllegalLoginException(String s) {
        super(s);
    }
}
