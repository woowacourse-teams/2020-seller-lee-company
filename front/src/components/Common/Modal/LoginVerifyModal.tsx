import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import theme from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { LoginTrialState } from "../../../states/AuthState";
import { memberState } from "../../../states/memberState";
import { RootStackParam } from "../../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginVerifyModalNavigationProp = StackNavigationProp<
  RootStackParam,
  "TeaserScreen"
>;

export default function LoginVerifyModal() {
  const navigation = useNavigation<LoginVerifyModalNavigationProp>();

  const [loginTrialState, setLoginTrialState] = useRecoilState(LoginTrialState);
  const state = useRecoilValue(memberState);

  const onPressCloseButton = () => {
    setLoginTrialState(false);

    if (state === "JOIN") {
      return navigation.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      });
    }
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={loginTrialState}
      onRequestClose={onPressCloseButton}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {state === "JOIN"
              ? "로그인에 성공하였습니다."
              : "로그인에 실패하였습니다."}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={onPressCloseButton}
            >
              <Text style={styles.buttonText}>나가기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: theme.secondary,
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
