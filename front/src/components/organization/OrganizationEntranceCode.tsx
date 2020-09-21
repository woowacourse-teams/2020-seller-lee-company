import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  organizationAlreadyRegisteredState,
  organizationExistState,
  organizationState,
} from "../../states/organizationState";
import theme from "../../colors";

export default function OrganizationEntranceCode() {
  const [{ code }, setOrganization] = useRecoilState(organizationState);

  const [isFocused, setIsFocused] = useState(false);
  const organizationExist = useRecoilValue(organizationExistState);
  const organizationAlreadyRegistered = useRecoilValue(
    organizationAlreadyRegisteredState,
  );

  const getEntranceCodeColor = () => {
    if (!isFocused) {
      return "lightgrey";
    }
    if (code.length < 6) {
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

  const renderWarningMessage = () => {
    if (!organizationExist) {
      return (
        <Text style={dynamicStyles.warningMessage}>
          유효하지 않은 입장 코드입니다.
        </Text>
      );
    }
    if (organizationAlreadyRegistered) {
      return (
        <Text style={dynamicStyles.warningMessage}>
          이미 가입한 조직입니다.
        </Text>
      );
    }
    if (isFocused && code.length < 6) {
      return (
        <Text style={dynamicStyles.warningMessage}>
          6자리의 입장 코드를 입력해주세요.
        </Text>
      );
    }
    return <></>;
  };

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
          onChangeText={(text) =>
            setOrganization({ id: 0, name: "", code: text })
          }
          maxLength={6}
          value={code}
        />
      </View>
      {renderWarningMessage()}
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
