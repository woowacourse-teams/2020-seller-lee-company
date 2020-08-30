import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  duplicateState,
  joinAvatarState,
  joinNicknameState,
  joinSubmitState,
} from "../../states/joinState";
import { profileAPI } from "../../api/api";
import theme from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { JoinScreenNavigationProp } from "../../types/types";
import {
  isBlank,
  isDuplicatedNickname,
  isValidNickname,
} from "../../nicknameValidator";
import { DeviceStorage } from "../../auth/DeviceStorage";

interface JoinSubmitProps {
  resetJoinForm: Function;
}

export default function JoinSubmit({ resetJoinForm }: JoinSubmitProps) {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const joinNickname = useRecoilValue(joinNicknameState);
  const joinAvatar = useRecoilValue(joinAvatarState);
  const setDuplicateState = useSetRecoilState(duplicateState);

  const setJoinSubmit = useSetRecoilState(joinSubmitState);

  const deleteJoiningMember = async () => {
    await profileAPI.delete();
    await DeviceStorage.clearToken();
  };

  const join = async () => {
    setJoinSubmit(true);

    if (isBlank(joinNickname) || !isValidNickname(joinNickname)) {
      return;
    }

    const { data } = await isDuplicatedNickname(joinNickname);

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
        navigation.navigate("BottomTabNavigation");
      } else {
        await deleteJoiningMember();
      }
    } catch (error) {
      console.log(error);
      await deleteJoiningMember();
    } finally {
      setJoinSubmit(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.joinButton} onPress={join}>
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
