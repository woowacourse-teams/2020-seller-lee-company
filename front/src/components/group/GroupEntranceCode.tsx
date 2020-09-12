import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { groupEntranceCodeState } from "../../states/groupState";
import theme from "../../colors";

export default function GroupEntranceCode() {
  const [groupEntranceCode, setGroupEntranceCode] = useRecoilState(
    groupEntranceCodeState,
  );

  const [isFocused, setIsFocused] = useState(false);

  const dynamicStyles = StyleSheet.create({
    entranceCodeContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: isFocused ? theme.secondary : "lightgrey",
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: isFocused ? theme.secondary : "lightgrey",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>입장 코드</Text>
      <View style={dynamicStyles.entranceCodeContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="hash"
            size={16}
            color={isFocused ? theme.secondary : "lightgrey"}
            style={styles.hashIcon}
          />
        </View>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          placeholder={"6자리의 입장코드를 입력해주세요"}
          keyboardType={"number-pad"}
          onChangeText={(text) => setGroupEntranceCode(text)}
          maxLength={6}
          value={groupEntranceCode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hashIcon: {
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
