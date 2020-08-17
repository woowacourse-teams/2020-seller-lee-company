/**
 * @author kouz95
 */

package sellerlee.back.favorite.presentation;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.favorite.presentation.FavoriteController.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.favorite.application.FavoriteRequest;
import sellerlee.back.favorite.application.FavoriteService;

@WebMvcTest(controllers = FavoriteController.class)
class FavoriteControllerTest {
    @MockBean
    private FavoriteService favoriteService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("찜 추가를 요청 하면 Status Created를 반환하고 Location이 존재한다.")
    @Test
    void create() throws Exception {
        when(favoriteService.create(any(), any())).thenReturn(1L);

        String request = objectMapper.writeValueAsString(new FavoriteRequest(1L));

        mockMvc.perform(post(FAVORITE_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andDo(print())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(status().isCreated());
    }

    @DisplayName("찜 취소를 요청 하면 Status OK를 반환한다.")
    @Test
    void deleteFavorite() throws Exception {

        String request = objectMapper.writeValueAsString(new FavoriteRequest(1L));

        mockMvc.perform(delete(FAVORITE_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andDo(print())
                .andExpect(status().isNoContent());

        verify(favoriteService).remove(any(), any());
    }
}
