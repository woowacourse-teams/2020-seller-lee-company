package sellerlee.back.member.domain;

public enum State {
    NEW(201),
    EXISTING(200),
    ;

    private final int httpStatus;

    State(int httpStatus) {
        this.httpStatus = httpStatus;
    }

    public int getHttp_status() {
        return httpStatus;
    }
}
