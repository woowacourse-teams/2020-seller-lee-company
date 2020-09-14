package com.jikgorae.api.group.application;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.group.domain.Group.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.group.domain.Group;
import com.jikgorae.api.group.domain.GroupRepository;

@ExtendWith(value = MockitoExtension.class)
class GroupServiceTest {
    @Mock
    private GroupRepository groupRepository;

    private GroupService groupService;

    @BeforeEach
    void setUp() {
        groupService = new GroupService(groupRepository);
    }

    @DisplayName("조직 생성 메서드 호출 시 동일한 이름의 조직이 존재하는지 확인 후 생성 코드를 포함하여 생성")
    @Test
    void create() {
        when(groupRepository.findAll()).thenReturn(Lists.emptyList());
        when(groupRepository.save(any())).thenReturn(GROUP1);

        Group group = groupService.create(GROUP_NAME);

        assertAll(
                () -> assertThat(group.getId()).isNotNull(),
                () -> assertThat(group.getName()).isEqualTo(GROUP_NAME),
                () -> assertThat(group.getCode()).hasSize(CODE_LENGTH)
        );
    }

    @DisplayName("이미 존재하는 조직의 경우 IllegalArgumentException 예외 발생")
    @Test
    void create_Name_Exception() {
        when(groupRepository.findAll()).thenReturn(Lists.newArrayList(GROUP1));

        assertThatThrownBy(() -> groupService.create(GROUP_NAME))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 존재하는 조직입니다.");
    }
}
