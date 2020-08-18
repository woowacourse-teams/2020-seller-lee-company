package sellerlee.back.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    private static final String API_URI = "/api";

    @GetMapping(API_URI)
    public String showDocuments() {
        return "docs.html";
    }
}
