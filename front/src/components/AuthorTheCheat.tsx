import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil/dist";
import { authorTheCheatState } from "../states/memberState";

export default function AuthorTheCheat() {
  const [theCheatState, setTheCheatState] = useRecoilState(authorTheCheatState);

  const iconName = theCheatState ? "account-check" : "account-check-outline";
  const iconColor = theCheatState ? "green" : "grey";
  const pressTheCheat = () =>
    theCheatState ? setTheCheatState(false) : setTheCheatState(true);

  return (
    <TouchableOpacity onPress={pressTheCheat} style={styles.container}>
      <MaterialCommunityIcons name={iconName} size={36} color={iconColor} />
      <Text style={styles.theCheatText}>더치트 조회</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  theCheatText: {
    fontSize: 11,
    color: "grey",
  },
});
