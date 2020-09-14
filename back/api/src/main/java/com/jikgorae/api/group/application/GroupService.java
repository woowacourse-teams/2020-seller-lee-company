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
        if (groupRepository.existsByName(groupName)) {
            throw new IllegalArgumentException("이미 존재하는 조직입니다.");
        }

        return new Group(51L, "직고래", "423502");
    }
}
