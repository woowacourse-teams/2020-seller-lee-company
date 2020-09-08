package sellerlee.back.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    public static final String API_URI = "/api";
    public static final String PRIVACY_URI = "/privacy";

    @GetMapping(API_URI)
    public String showDocuments() {
        return "docs.html";
    }

    @GetMapping(PRIVACY_URI)
    public String showPrivacy() {
        return "privacy.html";
    }
}
