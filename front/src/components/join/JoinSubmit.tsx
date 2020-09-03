import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  duplicateState,
  joinAvatarState,
  joinModalState,
  joinNicknameState,
  joinSubmitState,
  validateJoinState,
} from "../../states/joinState";
import { profileAPI } from "../../api/api";
import theme from "../../colors";
import {
  isBlank,
  isDuplicatedNickname,
  isValidNickname,
} from "../../nicknameValidator";

interface JoinSubmitProps {
  resetJoinForm: Function;
}

export default function JoinSubmit({ resetJoinForm }: JoinSubmitProps) {
  const joinNickname = useRecoilValue(joinNicknameState);
  const joinAvatar = useRecoilValue(joinAvatarState);
  const isValidateJoin = useRecoilValue(validateJoinState);
  const setJoinModalVisible = useSetRecoilState(joinModalState);
  const setDuplicateState = useSetRecoilState(duplicateState);

  const setJoinSubmit = useSetRecoilState(joinSubmitState);

  const join = async () => {
    setJoinSubmit(true);

    if (isBlank(joinNickname) || !isValidNickname(joinNickname)) {
      return;
    }

    const data = await isDuplicatedNickname(joinNickname);

    if (data) {
      setDuplicateState(true);
      return;
    }

    try {
      const response = await profileAPI.put({
        nickname: joinNickname,
        avatar: joinAvatar,
      });

      if (response.status === 204) {
        resetJoinForm();
        setJoinModalVisible(true);
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
        activeOpacity={isValidateJoin ? 0.3 : 1}
        style={styles.joinButton}
        onPress={() => {
          isValidateJoin && join();
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
