import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import JoinPasswordForm from "./JoinPasswordForm";
import JoinNicknameForm from "./JoinNicknameForm";
import JoinSubmit from "./JoinSubmit";
import { useResetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinNicknameState,
  joinPasswordState,
} from "../../states/joinState";

export default function Join() {
  const resetJoinNickname = useResetRecoilState(joinNicknameState);
  const resetJoinPassword = useResetRecoilState(joinPasswordState);
  const resetJoinAvatar = useResetRecoilState(joinAvatarState);

  const resetJoinValue = () => {
    resetJoinNickname();
    resetJoinPassword();
    resetJoinAvatar();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>닉네임으로 회원가입</Text>
        </View>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            <View style={styles.joinFormsContainer}>
              <View style={styles.joinFormContainer}>
                <JoinNicknameForm />
              </View>
              <View style={styles.joinFormContainer}>
                <JoinPasswordForm />
              </View>
            </View>
            <View style={styles.joinSubmitContainer}>
              <JoinSubmit resetJoinForm={resetJoinValue} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  title: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  joinFormsContainer: {
    justifyContent: "center",
    marginBottom: 30,
  },
  joinFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
  joinSubmitContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
