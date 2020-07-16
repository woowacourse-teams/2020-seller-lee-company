/**
 * @author kouz95
 */

import React, { useState } from "react";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function ArticleCreateOptionsModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <Button
        buttonStyle={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
        icon={
          <MaterialCommunityIcons
            name="pencil-box-outline"
            size={24}
            color={"grey"}
          />
        }
        containerStyle={styles.container}
      />
      <View>
        <Modal
          style={styles.contentView}
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.content}>
            <Button
              title={"글 쓰기"}
              titleStyle={styles.buttonTitle}
              onPress={() => {
                navigation.navigate("CreateArticle");
                setModalVisible(false);
              }}
              buttonStyle={styles.writeButton}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  buttonTitle: {
    color: "black",
  },
  writeButton: {
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
  },
});
