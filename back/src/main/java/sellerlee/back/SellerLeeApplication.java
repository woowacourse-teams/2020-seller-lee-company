/**
 * @author kouz95
 */

package sellerlee.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class SellerLeeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SellerLeeApplication.class, args);
    }
}
