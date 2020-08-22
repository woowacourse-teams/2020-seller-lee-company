import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  joinCheckPasswordState,
  joinPasswordState,
  joinSubmitState,
} from "../../states/joinState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../colors";
import { isBlank, isSamePassword } from "../../joinValidator";

export default function JoinCheckPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const joinPassword = useRecoilValue(joinPasswordState);
  const [joinCheckPassword, setJoinCheckPassword] = useRecoilState(
    joinCheckPasswordState,
  );
  const joinSubmit = useRecoilValue(joinSubmitState);

  const dynamicStyles = StyleSheet.create({
    checkPasswordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: focusTextInputState ? theme.secondary : "lightgrey",
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: focusTextInputState ? theme.secondary : "lightgrey",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  const invalidCheckPasswordMessage = () => {
    return (
      <Text style={styles.validateMessage}>비밀번호와 일치하지 않습니다.</Text>
    );
  };

  const emptyCheckPasswordMessage = () => {
    return (
      <Text style={styles.validateMessage}>
        비밀번호를 확인하지 않았습니다. 비밀번호를 확인해주세요.
      </Text>
    );
  };

  const validCheckPasswordMessage = () => {
    return <Text style={styles.validMessage}>비밀번호와 일치합니다.</Text>;
  };

  const validateMessageOnSubmit = () => {
    if (isBlank(joinCheckPassword)) {
      return emptyCheckPasswordMessage();
    }
    if (!isSamePassword(joinPassword, joinCheckPassword)) {
      return invalidCheckPasswordMessage();
    }
    return validCheckPasswordMessage();
  };

  const validateMessageNotSubmit = () => {
    if (isBlank(joinCheckPassword)) {
      return <></>;
    }
    if (!isSamePassword(joinPassword, joinCheckPassword)) {
      return invalidCheckPasswordMessage();
    }
    return validCheckPasswordMessage();
  };

  const validateIconOnSubmit = () => {
    if (
      isBlank(joinPassword) ||
      !isSamePassword(joinPassword, joinCheckPassword)
    ) {
      return (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  const validateIconNotSubmit = () => {
    if (isBlank(joinCheckPassword)) {
      return <></>;
    }
    if (!isSamePassword(joinPassword, joinCheckPassword)) {
      return (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>비밀번호 확인</Text>
      <View style={dynamicStyles.checkPasswordFormContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color={focusTextInputState ? theme.secondary : "lightgrey"}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setJoinCheckPassword}
          style={styles.checkPasswordForm}
          placeholder={"비밀번호 확인."}
          secureTextEntry={true}
        />
        {joinSubmit ? validateIconOnSubmit() : validateIconNotSubmit()}
      </View>
      {joinSubmit ? validateMessageOnSubmit() : validateMessageNotSubmit()}
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
  lockIcon: {
    marginLeft: 10,
  },
  checkPasswordForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
  validateIcon: {
    marginRight: 10,
  },
  validateMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.warning,
    fontSize: 13,
    fontWeight: "bold",
  },
  validMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.primary,
    fontSize: 13,
    fontWeight: "bold",
  },
});
