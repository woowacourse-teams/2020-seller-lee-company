import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinCheckPasswordState,
  joinNicknameState,
  joinPasswordState,
  joinSubmitState,
  memberJoinVerifyState,
} from "../../states/joinState";
import { memberAPI } from "../../api/api";
import theme from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { JoinScreenNavigationProp } from "../../types/types";
import { verify } from "../../joinValidator";

interface JoinSubmitProps {
  resetJoinForm: Function;
}

export default function JoinSubmit({ resetJoinForm }: JoinSubmitProps) {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const joinNickname = useRecoilValue(joinNicknameState);
  const joinPassword = useRecoilValue(joinPasswordState);
  const joinCheckPassword = useRecoilValue(joinCheckPasswordState);
  const joinAvatar = useRecoilValue(joinAvatarState);

  const setJoinSubmit = useSetRecoilState(joinSubmitState);
  const setJoinVerifyState = useSetRecoilState(memberJoinVerifyState);

  const join = async () => {
    setJoinSubmit(true);

    if (!verify(joinNickname, joinPassword, joinCheckPassword)) {
      return;
    }

    try {
      const response = await memberAPI.join({
        nickname: joinNickname,
        password: joinPassword,
        avatar: joinAvatar,
      });

      if (response.status === 201) {
        navigation.goBack();
        setJoinVerifyState(true);
        setTimeout(resetJoinForm, 1000);
      }
    } catch (error) {
      console.log(error);
      setJoinVerifyState(false);
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
