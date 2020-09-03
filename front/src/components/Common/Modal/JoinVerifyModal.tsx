import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil/dist";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { joinModalState } from "../../../states/joinState";
import theme from "../../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../../types/types";

type JoinVerifyModalNavigationProp = StackNavigationProp<
  RootStackParam,
  "JoinScreen"
>;

export default function JoinVerifyModal() {
  const navigation = useNavigation<JoinVerifyModalNavigationProp>();
  const [isModalVisible, setJoinModalVisible] = useRecoilState(joinModalState);

  const onPressCloseButton = () => {
    setJoinModalVisible(false);
    navigation.navigate("HomeStack");
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onPressCloseButton}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>회원가입에 성공하였습니다.</Text>
          <View style={styles.emptyContainer}>
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
  emptyContainer: {
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
