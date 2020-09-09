import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilValue } from "recoil";
import theme from "../../colors";
import { Feather } from "@expo/vector-icons";
import { myInfoSubmitState } from "../../states/myInfoState";

export default function MyInfoCheckPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const myInfoSubmit = useRecoilValue(myInfoSubmitState);

  const passwordFormColor = () => {
    if (!focusTextInputState) {
      return "lightgrey";
    }
    // if (
    // isBlank(myInfoCheckPassword) ||
    // !isSamePassword(myInfoPassword, myInfoCheckPassword)
    // ) {
    //   return theme.warning;
    // }
    return theme.secondary;
  };

  const dynamicStyles = StyleSheet.create({
    checkPasswordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      // borderColor: `${passwordFormColor()}`,
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      // color: `${passwordFormColor()}`,
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
    // if (isBlank(myInfoCheckPassword)) {
    //   return emptyCheckPasswordMessage();
    // }
    // if (!isSamePassword(myInfoPassword, myInfoCheckPassword)) {
    //   return invalidCheckPasswordMessage();
    // }
    return validCheckPasswordMessage();
  };

  const validateMessageNotSubmit = () => {
    // if (isBlank(myInfoCheckPassword)) {
    //   return <></>;
    // }
    // if (!isSamePassword(myInfoPassword, myInfoCheckPassword)) {
    //   return invalidCheckPasswordMessage();
    // }
    return validCheckPasswordMessage();
  };

  const validateIconOnSubmit = () => {
    // if (
    //   isBlank(myInfoPassword) ||
    //   !isSamePassword(myInfoPassword, myInfoCheckPassword)
    // ) {
    //   return (
    //     <View style={styles.iconContainer}>
    //       <Feather
    //         name="alert-circle"
    //         size={20}
    //         color={theme.warning}
    //         style={styles.validateIcon}
    //       />
    //     </View>
    //   );
    // }
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="check-circle"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  const validateIconNotSubmit = () => {
    // if (isBlank(myInfoCheckPassword)) {
    //   return <></>;
    // }
    // if (!isSamePassword(myInfoPassword, myInfoCheckPassword)) {
    //     return (
    //       <View style={styles.iconContainer}>
    //         <Feather
    //           name="alert-circle"
    //           size={20}
    //           color={theme.warning}
    //           style={styles.validateIcon}
    //         />
    //       </View>
    //     );
    //   }
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="check-circle"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
    // };
  };

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>비밀번호 확인</Text>
      <View style={dynamicStyles.checkPasswordFormContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="lock"
            size={20}
            color={passwordFormColor()}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          // onChangeText={setMyInfoCheckPassword}
          style={styles.checkPasswordForm}
          placeholder={"비밀번호 확인."}
          secureTextEntry={true}
        />
        {myInfoSubmit ? validateIconOnSubmit() : validateIconNotSubmit()}
      </View>
      {myInfoSubmit ? validateMessageOnSubmit() : validateMessageNotSubmit()}
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
