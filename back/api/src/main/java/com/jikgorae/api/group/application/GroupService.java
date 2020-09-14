package com.jikgorae.api.group.application;

import static com.jikgorae.api.group.domain.Group.*;
import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.jikgorae.api.group.domain.Group;
import com.jikgorae.api.group.domain.GroupRepository;

@Service
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Transactional
    public Group create(String groupName) {
        List<Group> groups = groupRepository.findAll();

        if (existsByName(groups, groupName)) {
            throw new IllegalArgumentException("이미 존재하는 조직입니다.");
        }

        return groupRepository.save(new Group(groupName, generateDistinctCode(groups)));
    }

    private boolean existsByName(List<Group> groups, String groupName) {
        return groups.stream()
                .map(Group::getName)
                .anyMatch(name -> name.equals(groupName));
    }

    private String generateDistinctCode(List<Group> groups) {
        String code = "";
        List<String> existCodes = groups.stream()
                .map(Group::getCode)
                .collect(toList());

        do {
            code = new Random().ints()
                    .limit(CODE_LENGTH)
                    .mapToObj(String::valueOf)
                    .collect(joining());
        } while (existCodes.contains(code));

        return code;
    }
}
