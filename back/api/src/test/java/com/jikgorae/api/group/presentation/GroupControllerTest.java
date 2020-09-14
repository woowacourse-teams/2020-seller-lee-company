package com.jikgorae.api.group.presentation;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.group.presentation.GroupController.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.group.application.GroupService;
import com.jikgorae.api.group.domain.GroupRepository;

@WebMvcTest(controllers = GroupController.class)
class GroupControllerTest extends ControllerTest {
    @MockBean
    private GroupService groupService;

    @MockBean
    private GroupRepository groupRepository;

    @DisplayName("조직 생성 시 HTTP STATUS는 CREATE이고 랜덤한 6자리 입장 코드를 반환")
    @Test
    void create() throws Exception {
        when(groupService.create(GROUP_NAME)).thenReturn(GROUP1);

        mockMvc.perform(
                post(GROUP_API_URI)
                        .param("name", GROUP_NAME)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }
}
