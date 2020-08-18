import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil/dist";
import {
  memberLoginTrialState,
  memberLoginVerifyState,
} from "../../../states/loginState";
import { LoginScreenNavigationProp } from "../../../types/types";

interface LoginVerifyModalProps {
  resetMemberLoginValue: Function;
}

export default function LoginVerifyModal({
  resetMemberLoginValue,
}: LoginVerifyModalProps) {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [loginTrialState, setLoginTrialState] = useRecoilState(
    memberLoginTrialState,
  );
  const [loginVerifyState, setLoginVerifyState] = useRecoilState(
    memberLoginVerifyState,
  );

  const onPressCloseButton = () => {
    setLoginTrialState(false);

    if (loginVerifyState) {
      resetMemberLoginValue();
      // TODO LoginScreen을 Home으로 변경해야 함
      navigation.navigate("BottomTabNavigation");
    }
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={loginTrialState}
      onRequestClose={() => setLoginVerifyState(false)}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {loginVerifyState
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
    backgroundColor: "#dfd3c3",
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
