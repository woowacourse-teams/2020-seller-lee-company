package sellerlee.back.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("security.jwt.token")
public class SecurityProperties {
    private String secretKey;

    private long expireLength;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public long getExpireLength() {
        return expireLength;
    }

    public void setExpireLength(long expireLength) {
        this.expireLength = expireLength;
    }
}
