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
import theme from "../../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam } from "../../../types/types";
import { myInfoModalState } from "../../../states/myInfoState";

type MyInfoModalNavigationProp = StackNavigationProp<
  HomeStackParam,
  "MyInfoScreen"
>;

export default function MyInfoModal() {
  const navigation = useNavigation<MyInfoModalNavigationProp>();
  const [isModalVisible, setMyInfoModalState] = useRecoilState(
    myInfoModalState,
  );

  const onPressCloseButton = () => {
    setMyInfoModalState(false);
    navigation.goBack();
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
          <Text style={styles.modalText}>회원 정보 수정을 완료하였습니다.</Text>
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
