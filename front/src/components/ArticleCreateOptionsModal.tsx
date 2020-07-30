/**
 * @author lxxjn0
 */

import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import theme from "../colors";

export default function ArticleCreateOptionsModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.writeButtonContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons
          name="pencil-box-outline"
          size={24}
          color={"grey"}
        />
      </TouchableOpacity>
      <View>
        <Modal
          style={styles.contentView}
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.content}>
            <Button
              title={"글쓰기"}
              onPress={() => {
                navigation.navigate("Posting");
                setModalVisible(false);
              }}
              color={theme.primary}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
