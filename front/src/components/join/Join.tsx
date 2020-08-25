import React from "react";
import { StyleSheet, Text, View } from "react-native";
import JoinPasswordForm from "./JoinPasswordForm";
import JoinNicknameForm from "./JoinNicknameForm";
import JoinSubmit from "./JoinSubmit";
import JoinCheckPasswordForm from "./JoinCheckPasswordForm";
import JoinVerifyModal from "../Common/Modal/JoinVerifyModal";

interface JoinProps {
  resetJoinForm: Function;
}

export default function Join({ resetJoinForm }: JoinProps) {
  return (
    <View style={styles.container}>
      <JoinVerifyModal />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.joinFormContainer}>
          <View style={styles.joinTextFormContainer}>
            <JoinNicknameForm />
          </View>
          <View style={styles.joinTextFormContainer}>
            <JoinPasswordForm />
          </View>
          <View style={styles.joinTextFormContainer}>
            <JoinCheckPasswordForm />
          </View>
          <View style={styles.joinSubmitContainer}>
            <JoinSubmit resetJoinForm={resetJoinForm} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleContainer: {
    marginTop: 80,
    marginBottom: 40,
    marginLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  joinFormContainer: {
    justifyContent: "flex-end",
    marginVertical: 40,
  },
  joinTextFormContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  joinSubmitContainer: {
    justifyContent: "center",
    marginVertical: 30,
  },
});
