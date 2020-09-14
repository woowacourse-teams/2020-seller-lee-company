package com.jikgorae.api.group.application;

import org.springframework.stereotype.Service;

import com.jikgorae.api.group.domain.Group;
import com.jikgorae.api.group.domain.GroupRepository;

@Service
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Group create(String groupName) {
        boolean exist = groupRepository.existsByName("직고래");
        return new Group(51L, "직고래", "423502");
    }
}
