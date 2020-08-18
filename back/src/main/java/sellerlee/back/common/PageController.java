package sellerlee.back.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/api")
    public String showDocuments() {
        return "docs.html";
    }
}
