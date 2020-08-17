package sellerlee.back.member.domain;

public class IllegalMemberLoginException extends IllegalArgumentException {
    public IllegalMemberLoginException(String s) {
        super(s);
    }
}
