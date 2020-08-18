import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import {
  joinAvatarState,
  joinNicknameState,
  joinPasswordState,
} from "../../states/joinState";
import { memberAPI } from "../../api/api";
import theme from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { JoinScreenNavigationProp } from "../../types/types";

interface JoinSubmitProps {
  resetJoinForm: Function;
}

export default function JoinSubmit({ resetJoinForm }: JoinSubmitProps) {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const joinNickname = useRecoilValue(joinNicknameState);
  const joinPassword = useRecoilValue(joinPasswordState);
  const joinAvatar = useRecoilValue(joinAvatarState);

  const join = async () => {
    const request = {
      nickname: joinNickname,
      password: joinPassword,
      avatar: joinAvatar,
    };

    try {
      const response = await memberAPI.join(request);

      if (response.status === 201) {
        resetJoinForm();
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
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
    aspectRatio: 7,
  },
  joinButton: {
    flex: 1,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  joinButtonText: {
    fontSize: 14,
    color: "white",
  },
});
