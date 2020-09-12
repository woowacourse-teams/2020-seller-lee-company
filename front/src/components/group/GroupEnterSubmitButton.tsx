import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { groupEntranceCodeState } from "../../states/groupState";

export default function GroupEnterSubmitButton() {
  const VALID_ENTRANCE_CODE_LENGTH = 6;

  const groupEntranceCode = useRecoilValue(groupEntranceCodeState);
  const resetGroupEntranceCode = useResetRecoilState(groupEntranceCodeState);

  const isInvalidEntranceCode = () => {
    return groupEntranceCode.length !== VALID_ENTRANCE_CODE_LENGTH;
  };

  const onEnterGroup = () => {
    alert("hello");
    resetGroupEntranceCode();
  };

  const dynamicStyles = StyleSheet.create({
    submitButton: {
      flex: 1,
      backgroundColor: isInvalidEntranceCode() ? "grey" : theme.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isInvalidEntranceCode()}
        style={dynamicStyles.submitButton}
        onPress={onEnterGroup}
      >
        <Text style={styles.enterSubmitText}>입장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  enterSubmitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
