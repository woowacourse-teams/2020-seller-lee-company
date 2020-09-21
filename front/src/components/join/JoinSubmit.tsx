import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinModalState,
  joinNicknameDuplicatedState,
  joinNicknameState,
  joinSubmitState,
} from "../../states/joinState";
import { profileAPI } from "../../api/api";
import theme from "../../colors";
import {
  isBlank,
  isDuplicatedNickname,
  isValidNickname,
} from "../../nicknameValidator";
import {
  memberAvatarState,
  memberNicknameState,
  memberProfileState,
} from "../../states/memberState";
import { noOrganizationState } from "../../states/organizationState";

interface JoinSubmitProps {
  resetJoinForm: Function;
}

export default function JoinSubmit({ resetJoinForm }: JoinSubmitProps) {
  const joinNickname = useRecoilValue(joinNicknameState);
  const joinAvatar = useRecoilValue(joinAvatarState);
  const setJoinModalVisible = useSetRecoilState(joinModalState);
  const setNicknameDuplicateState = useSetRecoilState(
    joinNicknameDuplicatedState,
  );
  const [joinSubmit, setJoinSubmit] = useRecoilState(joinSubmitState);
  const setNoOrganization = useSetRecoilState(noOrganizationState);
  const setProfile = useSetRecoilState(memberProfileState);
  const setNickname = useSetRecoilState(memberNicknameState);
  const setAvatar = useSetRecoilState(memberAvatarState);

  const isValidateSubmit = () => {
    if (!joinSubmit) {
      return !(!isBlank(joinNickname) && !isValidNickname(joinNickname));
    }
  };

  const join = async () => {
    setJoinSubmit(true);

    if (isBlank(joinNickname) || !isValidNickname(joinNickname)) {
      return;
    }

    const data = await isDuplicatedNickname(joinNickname);

    if (data) {
      setNicknameDuplicateState(true);
      return;
    }
    try {
      const response = await profileAPI.put({
        nickname: joinNickname,
        avatar: joinAvatar,
      });

      if (response.status === 204) {
        setProfile({ avatar: joinAvatar, nickname: joinNickname, score: 0 });
        setJoinModalVisible(true);
        setNoOrganization(true);
        setNickname(joinNickname);
        setAvatar(joinAvatar);
        resetJoinForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setJoinSubmit(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={isValidateSubmit() ? 0.3 : 1}
        style={styles.joinButton}
        onPress={() => {
          isValidateSubmit() && join();
        }}
      >
        <Text style={styles.joinButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  joinButton: {
    flex: 1,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
