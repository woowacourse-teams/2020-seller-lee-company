import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { organizationEntranceCodeState } from "../../states/organizationState";
import theme from "../../colors";

export default function OrganizationEntranceCode() {
  const [
    organizationEntranceCode,
    setOrganizationEntranceCode,
  ] = useRecoilState(organizationEntranceCodeState);

  const [isFocused, setIsFocused] = useState(false);

  const getEntranceCodeColor = () => {
    if (!isFocused) {
      return "lightgrey";
    }
    if (organizationEntranceCode.length < 6) {
      return theme.warning;
    }
    return theme.secondary;
  };

  const dynamicStyles = StyleSheet.create({
    entranceCodeContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: getEntranceCodeColor(),
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: getEntranceCodeColor(),
      fontSize: 14,
      fontWeight: "bold",
    },
    warningMessage: {
      marginLeft: 15,
      marginVertical: 5,
      color: theme.warning,
      fontSize: 13,
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
            color={getEntranceCodeColor()}
            style={styles.hashIcon}
          />
        </View>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          placeholder={"6자리의 입장코드를 입력해주세요"}
          keyboardType={"number-pad"}
          onChangeText={(text) => setOrganizationEntranceCode(text)}
          maxLength={6}
          value={organizationEntranceCode}
        />
      </View>
      {isFocused && organizationEntranceCode.length < 6 ? (
        <Text style={dynamicStyles.warningMessage}>
          6자리의 입장 코드를 입력해주세요.
        </Text>
      ) : (
        <></>
      )}
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
