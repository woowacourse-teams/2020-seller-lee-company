package sellerlee.back.favorite.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sellerlee.back.favorite.application.FavoriteCreateRequest;
import sellerlee.back.favorite.application.FavoriteService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sellerlee.back.favorite.presentation.FavoriteController.FAVORITE_URI;

@WebMvcTest(controllers = FavoriteController.class)
class FavoriteControllerTest {
    @MockBean
    private FavoriteService favoriteService;
    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void create() throws Exception {
        when(favoriteService.create(any())).thenReturn(1L);

        String request = objectMapper.writeValueAsString(new FavoriteCreateRequest(1L, 1L));

        mockMvc.perform(post(FAVORITE_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
