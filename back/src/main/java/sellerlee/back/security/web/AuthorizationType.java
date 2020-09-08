package sellerlee.back.security.web;

public enum AuthorizationType {
    BASIC,
    BEARER;

    public String toLowerCase() {
        return this.name().toLowerCase();
    }
}
